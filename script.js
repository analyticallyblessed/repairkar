document.getElementById('repair-form').addEventListener('submit', function (e) {
        e.preventDefault();

            // Collect form data
                const formData = new FormData(this);
                    const name = formData.get('name');
                        const phone = formData.get('phone');
                            const email = formData.get('email') || 'Not provided';
                                const brand = formData.get('brand');
                                    const model = formData.get('model');
                                        const issues = formData.getAll('issue').join(', ');
                                            const description = formData.get('description');
                                                const datetime = formData.get('datetime');
                                                    const address = formData.get('address');

                                                        // Create WhatsApp message
                                                            const message = `Hi RepairKar! I need a phone repair.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nBrand: ${brand}\nModel: ${model}\nIssues: ${issues}\nDescription: ${description}\nPreferred Date & Time: ${datetime}\nAddress: ${address}`;

                                                                // Encode message for URL
                                                                    const encodedMessage = encodeURIComponent(message);

                                                                        // Redirect to WhatsApp
                                                                            window.open(`https://wa.me/919667146563?text=${encodedMessage}`, '_blank');

                                                                                // Optional: Send form data to backend (requires server setup)
                                                                                    // Example: fetch('/submit', { method: 'POST', body: formData });
                                                                                    });
})