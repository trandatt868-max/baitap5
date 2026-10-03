function myFunction1() {
    const semester1Input = document.getElementById('text_1').value.trim();
    const semester2Input = document.getElementById('text_2').value.trim();
    const semester1 = Number(semester1Input);
    const semester2 = Number(semester2Input);
    const year = Number(document.getElementById('select').value);
    const display = document.getElementById('display');

    if (
        semester1Input === '' ||
        semester2Input === '' ||
        !Number.isFinite(semester1) ||
        !Number.isFinite(semester2) ||
        semester1 < 0 || semester1 > 10 ||
        semester2 < 0 || semester2 > 10
    ) {
        display.textContent = 'Vui lòng nhập điểm từ 0 đến 10 cho cả hai học kỳ.';
        display.style.color = 'red';
        document.getElementById('result').value = '';
        return;
    }

    const average = year === 2
        ? ((semester1 * 3) + (semester2 * 4)) / 7
        : (semester1 + semester2) / 2;
    document.getElementById('result').value = average.toFixed(2);

    const grade = average >= 9
        ? { label: 'Học sinh giỏi', color: 'red' }
        : average >= 7
            ? { label: 'Học sinh khá', color: 'blue' }
            : average >= 5
                ? { label: 'Học sinh trung bình', color: '#9a7b00' }
                : { label: 'Học sinh yếu', color: 'black' };
    display.textContent = grade.label;
    display.style.color = grade.color;
}

function myFunction2() {
    document.getElementById('text_1').value = "";
    document.getElementById('text_2').value = "";
    document.getElementById('result').value = "";
    document.getElementById('select').value = "1";
    document.getElementById('display').textContent = "";
}