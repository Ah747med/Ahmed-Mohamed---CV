document.addEventListener('DOMContentLoaded', () => {
    // Global function for PDF download
    window.downloadPDF = function () {
        const element = document.querySelector('.cv-container');
        element.classList.add('is-exporting');

        const opt = {
            margin: [3.5, 0, 10, 0],
            filename: 'Ahmed_Mohamed_Ahmed_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        const btn = document.querySelector('.print-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            element.classList.remove('is-exporting');
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            btn.innerHTML = originalText;
            btn.disabled = false;
            element.classList.remove('is-exporting');
            window.print();
        });
    };

    // Log for verification
    console.log('CV Scripts Loaded Successfully');

    // Certificate Modal Logic
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certImage');

    window.openCertModal = function (imgSrc) {
        modal.style.display = 'flex';
        // Small timeout to allow display: flex to apply before adding .show for transition
        setTimeout(() => {
            modal.classList.add('show');
            modalImg.src = imgSrc;
        }, 10);
    };

    window.closeCertModal = function () {
        modal.classList.remove('show');
        // Wait for transition to finish before hiding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCertModal();
        }
    });
});
