<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    private static function createMailer(): PHPMailer {
        $mail = new PHPMailer(true);
        $mail->CharSet    = 'UTF-8';
        $mail->Encoding   = 'base64';
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USER;
        $mail->Password   = SMTP_PASS;
        $mail->SMTPSecure = SMTP_PORT == 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = SMTP_PORT;
        $mail->setFrom(SMTP_USER, 'UMPSA Holdings Corporate Gift System');
        $mail->isHTML(true);
        return $mail;
    }

    private static function getEmailTemplate(string $title, string $content): string {
        return "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <style>
                body { margin:0; padding:0; font-family: 'Segoe UI', Arial, sans-serif; background:#f4f6f9; color: #1e293b; }
                .wrapper { max-width:600px; margin:40px auto; }
                .header { background: linear-gradient(135deg, #005A9C 0%, #00A3A1 100%); padding:32px 40px; text-align:center; border-radius:12px 12px 0 0; }
                .header h1 { color:#fff; margin:0; font-size:1.4rem; font-weight:700; letter-spacing:-0.5px; }
                .header p { color:rgba(255,255,255,0.8); margin:6px 0 0; font-size:0.85rem; }
                .body { background:#fff; padding:36px 40px; border-left:1px solid #e2e8f0; border-right:1px solid #e2e8f0; }
                .body h2 { color:#005A9C; font-size:1.25rem; margin:0 0 16px; }
                .info-table { width:100%; border-collapse:collapse; margin:20px 0; }
                .info-table td { padding:10px 14px; font-size:0.9rem; }
                .info-table tr:nth-child(odd) td { background:#f8fafc; }
                .info-table td:first-child { font-weight:600; color:#005A9C; width:40%; }
                .action-group { margin:28px 0 0; text-align:center; }
                .btn { display:inline-block; padding:12px 28px; border-radius:8px; font-weight:600; font-size:0.95rem; text-decoration:none; margin:6px; }
                .btn-approve { background:#00A3A1; color:#fff; }
                .btn-reject  { background:#e53e3e; color:#fff; }
                .btn-view    { background:#005A9C; color:#fff; }
                .notice { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:12px 16px; font-size:0.82rem; color:#166534; margin:20px 0 0; }
                .footer { background:#f8fafc; border:1px solid #e2e8f0; border-top:none; border-radius:0 0 12px 12px; padding:18px 40px; text-align:center; font-size:0.78rem; color:#94a3b8; }
                .status-badge { display:inline-block; padding:3px 10px; border-radius:20px; font-size:0.8rem; font-weight:600; }
                .badge-pending { background:#fef3c7; color:#92400e; }
                .badge-approved { background:#d1fae5; color:#065f46; }
                .badge-rejected { background:#fee2e2; color:#991b1b; }
                .divider { border:none; border-top:1px solid #e2e8f0; margin:24px 0; }
            </style>
        </head>
        <body>
            <div class='wrapper'>
                <div class='header'>
                    <h1>UMPSA Holdings</h1>
                    <p>Corporate Gift Management System</p>
                </div>
                <div class='body'>$content</div>
                <div class='footer'>
                    This is an automated notification from the UMPSA Holdings Corporate Gift System.<br>
                    &copy; " . date('Y') . " UMPSA Holdings Sdn Bhd. All rights reserved.
                </div>
            </div>
        </body>
        </html>";
    }

    /**
     * Add Admin as CC on notifications so Admin is kept informed at every stage
     */
    private static function addAdminCc(PHPMailer $mail, string $primary_email = ''): void {
        $admin_email = getSystemSetting('admin_email', ADMIN_EMAIL);
        if ($admin_email && strtolower(trim($primary_email)) !== strtolower(trim($admin_email))) {
            $mail->addCC($admin_email, 'System Administrator');
        }
    }

    /**
     * Notify the HOD that a new gift request awaits Level 1 approval
     */
    public static function sendHodNotification(array $request, array $requester, array $gift, string $hod_email, string $hod_name): bool {
        $approve_url = SITE_URL . '/email_action.php?action=approve&role=hod&request_id=' . $request['id'] . '&token=' . generateActionToken($request['id'], 'hod');
        $reject_url  = SITE_URL . '/email_action.php?action=reject&role=hod&request_id=' . $request['id'] . '&token=' . generateActionToken($request['id'], 'hod');
        $view_url    = SITE_URL . '/hod/index.php';

        $content = "
            <h2>New Gift Request &mdash; Your Approval Required</h2>
            <p>Dear <strong>" . htmlspecialchars($hod_name) . "</strong>,</p>
            <p>A new corporate gift request has been submitted by a member of your department and requires your approval as <strong>Head of Department (Level 1)</strong>.</p>
            <table class='info-table'>
                <tr><td>Request ID</td><td><strong>#" . $request['id'] . "</strong></td></tr>
                <tr><td>Requester</td><td>" . htmlspecialchars($requester['name']) . " (" . htmlspecialchars($requester['email']) . ")</td></tr>
                <tr><td>Department</td><td>" . htmlspecialchars($requester['department'] ?? 'N/A') . "</td></tr>
                <tr><td>Gift Requested</td><td>" . htmlspecialchars($gift['name']) . "</td></tr>
                <tr><td>Quantity</td><td>" . intval($request['quantity']) . " unit(s)</td></tr>
                <tr><td>Event Name</td><td>" . htmlspecialchars($request['event_name']) . "</td></tr>
                <tr><td>Recipient</td><td>" . htmlspecialchars($request['recipient_name']) . "</td></tr>
                <tr><td>Purpose</td><td>" . htmlspecialchars($request['purpose']) . "</td></tr>
                <tr><td>Date Submitted</td><td>" . date('d M Y, h:i A', strtotime($request['requested_at'])) . "</td></tr>
            </table>
            <p><strong>Justification Document:</strong> The requester has uploaded a justification file (letter/invitation). View it <a href='" . SITE_URL . '/uploads/justifications/' . urlencode($request['justification_file']) . "' style='color:#00A3A1;'>here</a>.</p>
            <hr class='divider'>
            <div class='action-group'>
                <p><strong>Take action directly from this email:</strong></p>
                <a href='$approve_url' class='btn btn-approve'>Approve Request</a>
                <a href='$reject_url' class='btn btn-reject'>Reject Request</a>
                <br><br>
                <a href='$view_url' class='btn btn-view'>View on Dashboard</a>
            </div>
            <div class='notice'><strong>Note:</strong> Clicking <strong>Approve</strong> will forward this request to the Head of SBD for final approval. Clicking <strong>Reject</strong> will prompt you for a reason and notify the requester.</div>
        ";

        try {
            $mail = self::createMailer();
            $mail->addAddress($hod_email, $hod_name);
            self::addAdminCc($mail, $hod_email);
            $mail->Subject = "[CG-{$request['id']}] New Gift Request: Approval Required - " . $requester['name'];
            $mail->Body    = self::getEmailTemplate('HOD Approval Request', $content);
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("HOD notification failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Notify the Head of SBD that a request has passed HOD approval (Level 2)
     */
    public static function sendSbdNotification(array $request, array $requester, array $gift, array $hod): bool {
        $sbd_email   = getSystemSetting('sbd_email', 'aymansha0533@gmail.com');
        $approve_url = SITE_URL . '/email_action.php?action=approve&role=sbd&request_id=' . $request['id'] . '&token=' . generateActionToken($request['id'], 'sbd');
        $reject_url  = SITE_URL . '/email_action.php?action=reject&role=sbd&request_id=' . $request['id'] . '&token=' . generateActionToken($request['id'], 'sbd');
        $view_url    = SITE_URL . '/sbd/index.php';

        $content = "
            <h2>Gift Request &mdash; Final Approval Required (Level 2)</h2>
            <p>Dear <strong>Head of Strategic Business Development</strong>,</p>
            <p>The following corporate gift request has been <strong>approved by the Head of Department</strong> and now requires your <strong>final approval as Head of SBD</strong>.</p>
            <table class='info-table'>
                <tr><td>Request ID</td><td><strong>#" . $request['id'] . "</strong></td></tr>
                <tr><td>Requester</td><td>" . htmlspecialchars($requester['name']) . " (" . htmlspecialchars($requester['email']) . ")</td></tr>
                <tr><td>Department</td><td>" . htmlspecialchars($requester['department'] ?? 'N/A') . "</td></tr>
                <tr><td>Gift Requested</td><td>" . htmlspecialchars($gift['name']) . "</td></tr>
                <tr><td>Quantity</td><td>" . intval($request['quantity']) . " unit(s)</td></tr>
                <tr><td>Event Name</td><td>" . htmlspecialchars($request['event_name']) . "</td></tr>
                <tr><td>Recipient</td><td>" . htmlspecialchars($request['recipient_name']) . "</td></tr>
                <tr><td>Purpose</td><td>" . htmlspecialchars($request['purpose']) . "</td></tr>
                <tr><td>HOD Approved By</td><td>" . htmlspecialchars($hod['name']) . "</td></tr>
                <tr><td>HOD Notes</td><td>" . htmlspecialchars($request['hod_notes'] ?? 'N/A') . "</td></tr>
            </table>
            <p><strong>Justification Document:</strong> <a href='" . SITE_URL . '/uploads/justifications/' . urlencode($request['justification_file']) . "' style='color:#00A3A1;'>View Uploaded File</a>.</p>
            <hr class='divider'>
            <div class='action-group'>
                <p><strong>Take action directly from this email:</strong></p>
                <a href='$approve_url' class='btn btn-approve'>Approve & Authorize Issuance</a>
                <a href='$reject_url' class='btn btn-reject'>Reject Request</a>
                <br><br>
                <a href='$view_url' class='btn btn-view'>View on Dashboard</a>
            </div>
            <div class='notice'><strong>Note:</strong> Clicking <strong>Approve</strong> is the final action. Gift stock will be decremented and the requester will be notified and issued a delivery slip.</div>
        ";

        try {
            $mail = self::createMailer();
            $mail->addAddress($sbd_email, 'Head of SBD');
            self::addAdminCc($mail, $sbd_email);
            $mail->Subject = "[CG-{$request['id']}] FINAL APPROVAL Required: " . htmlspecialchars($gift['name']) . " - " . htmlspecialchars($requester['name']);
            $mail->Body    = self::getEmailTemplate('SBD Approval Request', $content);
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("SBD notification failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Notify requester when request is approved
     */
    public static function sendFinalApprovalNotification(array $request, array $requester, array $gift): bool {
        $slip_url = SITE_URL . '/print_slip.php?id=' . $request['id'];
        $content = "
            <h2>Your Gift Request Has Been Approved!</h2>
            <p>Dear <strong>" . htmlspecialchars($requester['name']) . "</strong>,</p>
            <p>We are pleased to inform you that your corporate gift request has been <strong>fully approved</strong> by both your Head of Department and the Head of SBD.</p>
            <table class='info-table'>
                <tr><td>Request ID</td><td><strong>#" . $request['id'] . "</strong></td></tr>
                <tr><td>Gift</td><td>" . htmlspecialchars($gift['name']) . "</td></tr>
                <tr><td>Quantity</td><td>" . intval($request['quantity']) . " unit(s)</td></tr>
                <tr><td>Event Name</td><td>" . htmlspecialchars($request['event_name']) . "</td></tr>
                <tr><td>Status</td><td><span class='status-badge badge-approved'>APPROVED</span></td></tr>
            </table>
            <p>You may now print your <strong>Gift Issuance & Delivery Slip</strong> for collection.</p>
            <div class='action-group'>
                <a href='$slip_url' class='btn btn-approve'>Print Delivery Slip</a>
                <a href='" . SITE_URL . "/user/history.php' class='btn btn-view'>View My Requests</a>
            </div>
        ";

        try {
            $mail = self::createMailer();
            $mail->addAddress($requester['email'], $requester['name']);
            self::addAdminCc($mail, $requester['email']);
            $mail->Subject = "[CG-{$request['id']}] Approved - " . htmlspecialchars($gift['name']) . " Gift Request";
            $mail->Body    = self::getEmailTemplate('Request Approved', $content);
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Final approval notification failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Notify requester when request is rejected (HOD or SBD)
     */
    public static function sendRejectionNotification(array $request, array $requester, array $gift, string $rejected_by, string $notes): bool {
        $content = "
            <h2>Your Gift Request Has Been Rejected</h2>
            <p>Dear <strong>" . htmlspecialchars($requester['name']) . "</strong>,</p>
            <p>We regret to inform you that your corporate gift request has been <strong>rejected</strong> by <strong>" . htmlspecialchars($rejected_by) . "</strong>.</p>
            <table class='info-table'>
                <tr><td>Request ID</td><td><strong>#" . $request['id'] . "</strong></td></tr>
                <tr><td>Gift</td><td>" . htmlspecialchars($gift['name']) . "</td></tr>
                <tr><td>Quantity</td><td>" . intval($request['quantity']) . " unit(s)</td></tr>
                <tr><td>Rejected By</td><td>" . htmlspecialchars($rejected_by) . "</td></tr>
                <tr><td>Reason</td><td>" . htmlspecialchars($notes ?: 'No reason provided.') . "</td></tr>
                <tr><td>Status</td><td><span class='status-badge badge-rejected'>REJECTED</span></td></tr>
            </table>
            <p>If you have questions, please contact your Head of Department.</p>
            <div class='action-group'>
                <a href='" . SITE_URL . "/user/history.php' class='btn btn-view'>View My Requests</a>
            </div>
        ";

        try {
            $mail = self::createMailer();
            $mail->addAddress($requester['email'], $requester['name']);
            self::addAdminCc($mail, $requester['email']);
            $mail->Subject = "[CG-{$request['id']}] Rejected - " . htmlspecialchars($gift['name']) . " Gift Request";
            $mail->Body    = self::getEmailTemplate('Request Rejected', $content);
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Rejection notification failed: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Send submission confirmation to requester
     */
    public static function sendSubmissionConfirmation(array $request, array $requester, array $gift): bool {
        $content = "
            <h2>Gift Request Submitted Successfully</h2>
            <p>Dear <strong>" . htmlspecialchars($requester['name']) . "</strong>,</p>
            <p>Your corporate gift request has been submitted and is now <strong>pending review by your Head of Department</strong>.</p>
            <table class='info-table'>
                <tr><td>Request ID</td><td><strong>#" . $request['id'] . "</strong></td></tr>
                <tr><td>Gift</td><td>" . htmlspecialchars($gift['name']) . "</td></tr>
                <tr><td>Quantity</td><td>" . intval($request['quantity']) . " unit(s)</td></tr>
                <tr><td>Event Name</td><td>" . htmlspecialchars($request['event_name']) . "</td></tr>
                <tr><td>Current Status</td><td><span class='status-badge badge-pending'>Pending HOD Approval</span></td></tr>
            </table>
            <p>You will receive an email notification when your request has been reviewed. You may also track progress on the portal.</p>
            <div class='action-group'>
                <a href='" . SITE_URL . "/user/history.php' class='btn btn-view'>Track My Request</a>
            </div>
        ";

        try {
            $mail = self::createMailer();
            $mail->addAddress($requester['email'], $requester['name']);
            self::addAdminCc($mail, $requester['email']);
            $mail->Subject = "[CG-{$request['id']}] Request Submitted - " . htmlspecialchars($gift['name']);
            $mail->Body    = self::getEmailTemplate('Request Submitted', $content);
            $mail->send();
            return true;
        } catch (Exception $e) {
            error_log("Submission confirmation failed: " . $e->getMessage());
            return false;
        }
    }
}
?>
