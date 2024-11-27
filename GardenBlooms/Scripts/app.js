 // Initialize AOS
 AOS.init({
    duration: 1000,
    once: true
});

// Form Validation and Submission
$(document).ready(function() {
    const form = $('#contactForm');
    const feedback = $('#formFeedback');

    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        $('.error-message').hide();
        $('.form-control').removeClass('input-error');

        // Validate Name
        const name = $('#name').val().trim();
        if (name === '') {
            $('#nameError').show();
            $('#name').addClass('input-error');
            isValid = false;
        }

        // Validate Email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#emailError').show();
            $('#email').addClass('input-error');
            isValid = false;
        }

        // Validate Subject
        const subject = $('#subject').val().trim();
        if (subject === '') {
            $('#subjectError').show();
            $('#subject').addClass('input-error');
            isValid = false;
        }

        // Validate Message
        const message = $('#message').val().trim();
        if (message === '') {
            $('#messageError').show();
            $('#message').addClass('input-error');
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    form.on('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Simulate form submission
            const submitButton = $(this).find('button[type="submit"]');
            submitButton.prop('disabled', true);
            submitButton.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');

            // Simulate API call
            setTimeout(function() {
                feedback.removeClass('error-feedback success-feedback');
                feedback.addClass('success-feedback')
                    .html('<i class="fas fa-check-circle me-2"></i>Thank you! Your message has been sent successfully.')
                    .slideDown();

                // Reset form
                form[0].reset();
                submitButton.prop('disabled', false);
                submitButton.html('<i class="fas fa-paper-plane me-2"></i>Send Message');

                // Hide success message after 5 seconds
                setTimeout(function() {
                    feedback.slideUp();
                }, 5000);
            }, 2000);
        } else {
            feedback.removeClass('error-feedback success-feedback');
            feedback.addClass('error-feedback')
                .html('<i class="fas fa-exclamation-circle me-2"></i>Please fix the errors in the form.')
                .slideDown();
        }
    });

    // Real-time validation on input
    $('.form-control').on('input', function() {
        const input = $(this);
        const errorMessage = $(`#${input.attr('id')}Error`);
        
        if (input.val().trim() !== '') {
            input.removeClass('input-error');
            errorMessage.hide();
        }
    });
});