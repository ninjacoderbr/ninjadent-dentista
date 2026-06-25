document.addEventListener('DOMContentLoaded', () => {
    // Before / After Slider
    const sliderControl = document.getElementById('sliderControl');
    const sliderContainer = document.getElementById('teethSlider');
    
    if (sliderControl && sliderContainer) {
        sliderControl.addEventListener('input', (e) => {
            const val = e.target.value;
            sliderContainer.style.setProperty('--slide-pos', `${val}%`);
        });
    }

    // Time Slot Selector
    const slotChips = document.querySelectorAll('.slot-chip');
    let selectedSlot = '';

    slotChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Deselect other slots
            slotChips.forEach(c => c.classList.remove('selected'));
            // Select this slot
            chip.classList.add('selected');
            selectedSlot = chip.getAttribute('data-slot');
        });
    });

    // Booking Form Submission & Success Overlay
    const bookingForm = document.getElementById('bookingForm');
    const successOverlay = document.getElementById('successOverlay');
    const successSummary = document.getElementById('successSummary');
    const btnDone = document.getElementById('btnDone');

    if (bookingForm && successOverlay) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract form values
            const name = document.getElementById('patientName').value || 'Guest';
            const service = document.getElementById('serviceSelect').value;
            const dentist = document.getElementById('dentistSelect').value;
            const dateVal = document.getElementById('appointmentDate').value;

            // Make sure a slot is chosen
            if (!selectedSlot) {
                alert('Please select a preferred time slot.');
                return;
            }

            // Build confirmation summary HTML
            const dateFormatted = dateVal ? new Date(dateVal).toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }) : 'Selected Date';

            successSummary.innerHTML = `
                Dear <strong>${name}</strong>,<br>
                Your appointment for <strong>${service}</strong> with <strong>${dentist}</strong> has been successfully booked for:<br><br>
                <span style="color: var(--primary); font-weight: 600; font-size: 1.1rem;">${dateFormatted} at ${selectedSlot}</span>
            `;

            // Active overlay
            successOverlay.classList.add('active');
        });
    }

    if (btnDone && successOverlay) {
        btnDone.addEventListener('click', () => {
            // Reset Form and overlay
            bookingForm.reset();
            slotChips.forEach(c => c.classList.remove('selected'));
            selectedSlot = '';
            successOverlay.classList.remove('active');
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
