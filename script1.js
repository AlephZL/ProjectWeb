document.addEventListener('DOMContentLoaded', function() {

    // Kursor kostum interaktif
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Gerakkan kursor kustom akan mengikuti gerak kursor utama
        cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

        //Outline akan sedikit tertinggil agar lebih estetik
        cursorOutline.animate({
            transform: `translate(${posX}px, ${posY}px)`
        }, {
            duration: 450,
            fill: `forwards`
        });

        // Agar kursor membesar saat menyentuh target
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(200, 35, 51, 0.1)';
            });
            target.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    });


    // Header slideshow seperti web Tajaq Boutique
    const headerIMG = document.querySelector('.header-background')

    const daftarGambar = [
        "Foto/Header Restoran Jepang.png",
        "Foto/Header Restoran Jepang 1.png",
        "Foto/Header Restoran Jepang 2.png",
        "Foto/Header Restoran Jepang 3.png",
        "Foto/Header Restoran Jepang 4.png"
    ];

    let urutanGambar = 0;

    setInterval (() => {
        headerIMG.style.opacity = 0.2;

        setTimeout(() => {
            urutanGambar = (urutanGambar + 1) % daftarGambar.length;
            headerIMG.style.background = `linear-gradient(rgba(15, 15, 15, 0.85), rgba(15, 15, 15, 0.7)), url('${daftarGambar[urutanGambar]}')`;
            headerIMG.style.opacity = 1;
        }, 1000)
    }, 5000);

    // Animasi scroll agar tidak langsung semuanya muncul
    const elementsAnimasi = document.querySelectorAll('.animasi');

    const observerOptions = {
        threshold: 0.03
    };

    const pemantauScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aktif');
            }
        });
    }, observerOptions);

    elementsAnimasi.forEach(element => {
        pemantauScroll.observe(element);
    });

    // Bagian pemberitahuan (alert) untuk form kontak
    const alertKontak = document.getElementById('CustomPemberitahuan');
    const alertJudul = document.getElementById('alert-title');
    const alertPesan = document.getElementById('alert-pesan');
    const btnClose = document.getElementById('alert-tutup');

    function tampilkanAlert(judul, pesan, isError = false) {
        alertJudul.innerText = judul;
        alertJudul.style.color = isError ? "red" : "green";
        alertPesan.innerText = pesan;
        alertKontak.classList.add('show');
    }

    btnClose.addEventListener('click', () => {
        alertKontak.classList.remove('show');
    });

    // Validasi form kontak
    const formKontak = document.getElementById('FormKontak');

    formKontak.addEventListener('submit', function(event) {
        event.preventDefault();

        const Nama = document.getElementById('nama').value.trim();
        const NoHP = document.getElementById('NoHP').value.trim();
        const Email = document.getElementById('email').value.trim();
        const Pesan = document.getElementById('pesan').value.trim();

        // Validasi data kosong
        if (!Nama || !NoHP || !Email || !Pesan) {
            tampilkanAlert(
                "Pengiriman Gagal",
                "Mohon lengkapi seluruh kolom formulir sebelum mengirim.",
                true
            );
        } else {
            tampilkanAlert(
                "Pesan Terkirim",
                `Terima kasih, ${Nama}. Pesan Anda telah berhasil dikirimkan kepada pemilik web.
                Kami sangat menghargai masukan dan pesan yang Anda sampaikan.`,
            );
            formKontak.reset();
        }
    });
});
