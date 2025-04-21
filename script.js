document.getElementById('repair-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email') || 'Not provided',
        brand: formData.get('brand'),
        model: formData.get('model'),
        issues: formData.getAll('issue'),
        description: formData.get('description'),
        datetime: formData.get('datetime'),
        address: formData.get('address')
    };

    // Client-side validation
    if (!data.name || data.name.length < 2) {
        showFormMessage('Please enter a valid name.', 'error');
        return;
    }
    if (!data.phone || !/^[0-9]{10}$/.test(data.phone)) {
        showFormMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    if (!data.brand) {
        showFormMessage('Please select a device brand.', 'error');
        return;
    }
    if (!data.model) {
        showFormMessage('Please enter a device model.', 'error');
        return;
    }
    if (!data.issues.length) {
        showFormMessage('Please select at least one issue type.', 'error');
        return;
    }
    if (!data.description || data.description.length < 10) {
        showFormMessage('Please provide a detailed description (min 10 characters).', 'error');
        return;
    }
    if (!data.datetime) {
        showFormMessage('Please select a preferred date and time.', 'error');
        return;
    }
    if (!data.address || data.address.length < 10) {
        showFormMessage('Please provide a valid address (min 10 characters).', 'error');
        return;
    }

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to submit form');
        const result = await response.json();
        showFormMessage('Form submitted! Redirecting to WhatsApp...', 'success');
        setTimeout(() => {
            window.open(result.whatsappUrl, '_blank');
        }, 1000);
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Error submitting form. Please try again.', 'error');
        // Fallback WhatsApp redirect
        const message = `Hi RepairKar! I need a phone repair.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nBrand: ${data.brand}\nModel: ${data.model}\nIssues: ${data.issues.join(', ')}\nDescription: ${data.description}\nPreferred Date & Time: ${data.datetime}\nAddress: ${data.address}`;
        const encodedMessage = encodeURIComponent(message);
        setTimeout(() => {
            window.open(`https://wa.me/919899964218?text=${encodedMessage}`, '_blank');
        }, 1000);
    }
});

function showFormMessage(message, type) {
    const messageEl = document.getElementById('form-message');
    messageEl.textContent = message;
    messageEl.style.color = type === 'success' ? '#00c4b4' : '#ff4d4d';
    setTimeout(() => {
        messageEl.textContent = '';
    }, 5000);
}
