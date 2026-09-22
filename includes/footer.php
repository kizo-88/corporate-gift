<?php if (isLoggedIn()): ?>
</div><!-- /.main-wrapper -->
<?php endif; ?>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- DataTables -->
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

<script>
// Global loading overlay helpers
function showLoading(msg) {
    msg = msg || 'Processing, please wait...';
    document.getElementById('loadingText').textContent = msg;
    document.getElementById('loadingOverlay').classList.add('active');
}
function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
}

// Auto-show SweetAlert2 for flash messages passed in session
<?php if (isset($_SESSION['flash'])): ?>
const flash = <?= json_encode($_SESSION['flash']) ?>;
Swal.fire({
    icon: flash.type || 'info',
    title: flash.title || 'Notice',
    text: flash.message || '',
    confirmButtonColor: '#00A3A1',
    timer: flash.timer || null,
    timerProgressBar: true,
});
<?php unset($_SESSION['flash']); endif; ?>
</script>
</body>
</html>
