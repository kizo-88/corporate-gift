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

  // Initial corporate proposal in quote cart
  const [confirmedBookings, setConfirmedBookings] = useState([
    {
      id: 'AQ-948102',
      service: {
        id: 'cg1',
        name: 'Aura Wireless Executive Desk Pad',
        price: 110
      },
      product: {
        id: 'cg1',
        name: 'Aura Wireless Executive Desk Pad',
        price: 110
      },
      quantity: 50,
      selectedBranding: ['Laser Engraving', 'Gold Foil Stamping'],
      grandTotal: 5250,
      company: {
        companyName: 'TechCorp International',
        contactName: 'Victoria Sterling',
        email: 'v.sterling@techcorp.com'
      },
      customer: {
        name: 'Victoria Sterling',
        email: 'v.sterling@techcorp.com'
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
    if (window.confirm('Are you sure you wish to remove this proposal from your quote cart?')) {
      setConfirmedBookings((prev) => prev.filter((b) => b.id !== bookingId));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-slate)' }}>
      {/* Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAppointments={() => setAppointmentsDrawerOpen(true)}
        appointmentCount={confirmedBookings.length}
      />

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>
        <Hero
          onBookNow={() => handleOpenBooking()}
          onExploreServices={() => {
            const el = document.querySelector('#catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Services
          onSelectService={(service) => handleOpenBooking({ service })}
        />

        <WhyChooseLume />

        <Packages
          onSelectPackage={(pkg) => handleOpenBooking({ package: pkg })}
        />

        <Specialists
          onSelectSpecialist={(specialist) => handleOpenBooking({ specialist })}
        />

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

      {/* Interactive Multi-Step Quote Builder Modal */}
      <BookingWizard
        isOpen={bookingWizardOpen}
        onClose={() => {
          setBookingWizardOpen(false);
          setInitialBookingData(null);
        }}
        initialData={initialBookingData}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Quote Items & Proposal Cart Drawer */}
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

