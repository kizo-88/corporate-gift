import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Specialists from './components/Specialists';
import Packages from './components/Packages';
import WhyChooseLume from './components/WhyChooseLume';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingWizard from './components/BookingWizard';
import AppointmentsDrawer from './components/AppointmentsDrawer';

export default function App() {
  const [bookingWizardOpen, setBookingWizardOpen] = useState(false);
  const [appointmentsDrawerOpen, setAppointmentsDrawerOpen] = useState(false);
  const [initialBookingData, setInitialBookingData] = useState(null);

  // Initialize with a realistic sample confirmed booking so user can test drawer immediately
  const [confirmedBookings, setConfirmedBookings] = useState([
    {
      id: '849201',
      service: {
        id: 's3',
        name: 'Signature Lumé Glow Facial',
        price: 180,
        duration: '75 mins'
      },
      specialist: {
        id: 'sp2',
        name: 'Mei Lin Tan',
        role: 'Skin Therapist'
      },
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      time: '2:00 PM',
      customer: {
        name: 'Sophia Chen',
        email: 'sophia@example.com',
        phone: '+60 12-345 6789'
      },
      createdAt: new Date().toISOString()
    }
  ]);

  const handleOpenBooking = (data = null) => {
    setInitialBookingData(data);
    setBookingWizardOpen(true);
  };

  const handleConfirmBooking = (newBooking) => {
    setConfirmedBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you wish to cancel this appointment ritual?')) {
      setConfirmedBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-cream)' }}>
      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAppointments={() => setAppointmentsDrawerOpen(true)}
        appointmentCount={confirmedBookings.length}
      />

      {/* Main Page Content */}
      <main style={{ flexGrow: 1 }}>
        <Hero
          onBookNow={() => handleOpenBooking()}
          onExploreServices={() => {
            const el = document.querySelector('#services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Services
          onSelectService={(service) => handleOpenBooking({ service })}
        />

        <Specialists
          onSelectSpecialist={(specialist) => handleOpenBooking({ specialist })}
        />

        <Packages
          onSelectPackage={(pkg) => handleOpenBooking({ package: pkg })}
        />

        <WhyChooseLume />

        <Testimonials />

        <Gallery />

        <About
          onBookNow={() => handleOpenBooking()}
        />

        <Contact />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Multi-Step Booking Wizard Modal */}
      <BookingWizard
        isOpen={bookingWizardOpen}
        onClose={() => {
          setBookingWizardOpen(false);
          setInitialBookingData(null);
        }}
        initialData={initialBookingData}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Appointments Drawer Modal */}
      <AppointmentsDrawer
        isOpen={appointmentsDrawerOpen}
        onClose={() => setAppointmentsDrawerOpen(false)}
        appointments={confirmedBookings}
        onCancelBooking={handleCancelBooking}
        onBookNew={() => handleOpenBooking()}
      />
    </div>
  );
}
