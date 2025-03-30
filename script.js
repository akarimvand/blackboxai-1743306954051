// داده‌های ماه‌های فارسی و تعداد روزهای هر ماه
const monthsData = [
    { name: 'فروردین', days: 31 },
    { name: 'اردیبهشت', days: 31 },
    { name: 'خرداد', days: 31 },
    { name: 'تیر', days: 31 },
    { name: 'مرداد', days: 31 },
    { name: 'شهریور', days: 30 },
    { name: 'مهر', days: 30 },
    { name: 'آبان', days: 30 },
    { name: 'آذر', days: 30 },
    { name: 'دی', days: 30 },
    { name: 'بهمن', days: 30 },
    { name: 'اسفند', days: 29 }
];

// رویداد بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function () {
    // پر کردن ComboBox ماه‌ها
    const monthName = document.getElementById('monthName');
    monthsData.forEach((month, index) => {
        let option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month.name;
        monthName.appendChild(option);
    });
    monthName.value = '1'; // پیش‌فرض: فروردین

    // پر کردن ComboBox تعداد فرزند
    const tFarzand = document.getElementById('tFarzand');
    for (let i = 0; i <= 3; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        tFarzand.appendChild(option);
    }
    tFarzand.value = '0'; // پیش‌فرض: ۰ فرزند

    // تنظیم پیش‌فرض تعداد روزهای ماه و حضور
    updateMonthDays();
});

// رویداد تغییر ماه
document.getElementById('monthName').addEventListener('change', function () {
    updateMonthDays();
});

// تابع به‌روزرسانی تعداد روزهای ماه و حضور
function updateMonthDays() {
    const selectedMonthIndex = parseInt(document.getElementById('monthName').value) - 1;
    const selectedMonth = monthsData[selectedMonthIndex];
    const monthDays = document.getElementById('monthDays');
    const hozor = document.getElementById('hozor');

    // تنظیم تعداد روزهای ماه
    monthDays.value = selectedMonth.days;

    // پر کردن ComboBox حضور
    hozor.innerHTML = '';
    for (let i = 1; i <= selectedMonth.days; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        hozor.appendChild(option);
    }
    hozor.value = selectedMonth.days.toString(); // پیش‌فرض: تعداد روزهای ماه

    // به‌روزرسانی ComboBox مرخصی
    updateMorakhasi();
}

// رویداد تغییر حضور
document.getElementById('hozor').addEventListener('change', function () {
    updateMorakhasi();
});

// تابع به‌روزرسانی ComboBox مرخصی
function updateMorakhasi() {
    const morakhasi = document.getElementById('morakhasi');
    const monthDays = parseInt(document.getElementById('monthDays').value);
    const hozorValue = parseInt(document.getElementById('hozor').value);

    morakhasi.innerHTML = '';
    for (let i = 0; i <= monthDays - hozorValue; i++) { // شروع از ۰
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        morakhasi.appendChild(option);
    }
    morakhasi.value = '0'; // پیش‌فرض: ۰ روز مرخصی
}

// تابع تغییر مقدار حق تاهل
function toggleHaghtahol() {
    const haghtahol = document.getElementById('haghtahol');
    if (haghtahol.value === '0') {
        haghtahol.value = '5000000';
    } else {
        haghtahol.value = '0';
    }
}

// تابع تغییر منطقه (عادی/ویژه)
function toggleMantaghe() {
    const mantagheToggle = document.getElementById('mantagheToggle');
    if (mantagheToggle.textContent === 'منطقه عادی') {
        mantagheToggle.textContent = 'منطقه ویژه';
        mantagheToggle.classList.add('region-special');
    } else {
        mantagheToggle.textContent = 'منطقه عادی';
        mantagheToggle.classList.remove('region-special');
    }
}

// تابع محاسبه حقوق
function mohasebe() {
    const dastmozRozaneh = parseFloat(document.getElementById('dastmozRozaneh').value);
    const zarib = parseFloat(document.getElementById('zarib').value);
    const tFarzand = parseFloat(document.getElementById('tFarzand').value);
    const zaribEzafe = parseFloat(document.getElementById('zaribEzafe').value);
    const eKargahi = parseFloat(document.getElementById('eKargahi').value);
    const eSaati = parseFloat(document.getElementById('eSaati').value);
    const ayab = parseFloat(document.getElementById('ayab').value);
    const haghtahol = parseFloat(document.getElementById('haghtahol').value);
    const mantaghe = document.getElementById('mantagheToggle').textContent === 'منطقه ویژه';
    const hozor = parseInt(document.getElementById('hozor').value);
    const morakhasi = parseInt(document.getElementById('morakhasi').value);
    const monthDays = parseInt(document.getElementById('monthDays').value);
    const mMosaede = parseFloat(document.getElementById('mMosaede').value);
    const padash = parseFloat(document.getElementById('padash').value);

    if (isNaN(dastmozRozaneh) || dastmozRozaneh <= 0) {
        alert('لطفاً مبلغ دستمزد روزانه را به ریال وارد نمایید.');
        return;
    }

    // محاسبات
    const mDasMah = (hozor + morakhasi) * dastmozRozaneh;
    const mHaghOlad = (tFarzand * 7166000) * ((hozor + morakhasi) / monthDays);
    const hMaskan = 9000000 * ((hozor + morakhasi) / monthDays);
    const hBon = 14000000 * ((hozor + morakhasi) / monthDays);
    const mZarib = (mDasMah * zarib) - mDasMah;
    const eSabat = mDasMah * (zaribEzafe / 100);
    const mEzafe = ((eKargahi + eSaati) * ((dastmozRozaneh / 7.33) * 1.4 * zarib)) + eSabat;
    const nakhales = mEzafe + mDasMah + mZarib + hMaskan + hBon;
    const nakhales2 = nakhales + mHaghOlad;
    const hBimeh = nakhales * 0.07;
    let mMalyat = 0;

    // محاسبه مالیات
    if (mantaghe) {
        if (nakhales2 <= 240000000) {
            mMalyat = 0;
        } else if (nakhales2 <= 300000000) {
            mMalyat = (nakhales2 * 0.1) / 2;
        } else if (nakhales2 <= 380000000) {
            mMalyat = (nakhales2 * 0.15) / 2;
        } else if (nakhales2 <= 500000000) {
            mMalyat = (nakhales2 * 0.2) / 2;
        } else if (nakhales2 <= 667000000) {
            mMalyat = (nakhales2 * 0.25) / 2;
        } else {
            mMalyat = (nakhales2 * 0.3) / 2;
        }
    } else {
        if (nakhales2 <= 240000000) {
            mMalyat = 0;
        } else if (nakhales2 <= 300000000) {
            mMalyat = nakhales2 * 0.1;
        } else if (nakhales2 <= 380000000) {
            mMalyat = nakhales2 * 0.15;
        } else if (nakhales2 <= 500000000) {
            mMalyat = nakhales2 * 0.2;
        } else if (nakhales2 <= 667000000) {
            mMalyat = nakhales2 * 0.25;
        } else {
            mMalyat = nakhales2 * 0.3;
        }
    }

    const mDaryafti = nakhales - hBimeh - mMalyat + mHaghOlad + ayab + haghtahol - mMosaede + padash;

    // نمایش نتایج
    document.getElementById('mDasMah').value = formatNumber(mDasMah);
    document.getElementById('mHaghOlad').value = formatNumber(mHaghOlad);
    document.getElementById('hMaskan').value = formatNumber(hMaskan);
    document.getElementById('hBon').value = formatNumber(hBon);
    document.getElementById('mEzafe').value = formatNumber(mEzafe);
    document.getElementById('hBimeh').value = formatNumber(hBimeh);
    document.getElementById('mMalyat').value = formatNumber(mMalyat);
    document.getElementById('mDaryafti').value = formatNumber(mDaryafti);
}

// تابع فرمت‌دهی اعداد به فرمت فارسی
function formatNumber(num) {
    return num.toLocaleString('fa-IR');
}

// تابع چاپ فرم
function printForm() {
    window.print();
}