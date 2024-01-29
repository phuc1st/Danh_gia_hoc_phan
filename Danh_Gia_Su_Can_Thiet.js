// Code bới phúc - người chưa đầy 1 tuổi đã được Nhà nước phát giấy tờ
console.log(
  "thằng nào có tiền thì nạp tiền vào donate cho tao ít thì 5 quả trứng nhiều thì 1 tên lửa..\n" +
    "Tôi năm nay hơn 70 tuổi mà tôi chưa gặp cái trường hợp nào nó như này cả, phải tôi tôi đấm cho mấy nhát"
);
let value = "3"; // 1-ko cần, 2-cần, 3-rất cần;

function update(hocphan_id, value) {
  url = "/sv/cap-nhat-khao-sat-hoc-phan";
  $.ajax({
    type: "GET",
    url: url,
    cache: "false",
    data: { hocphan_id: hocphan_id, value: value },
    success: () => {
      console.log("Thành công!");
    },
  });
}

const links = Array.from(
  document.querySelectorAll('a[href*="/sv/khao-sat-hoc-phan?id="]')
);

function updates(links, value) {
  for (let link of links) {
    let hocphan_id = link.href.split("=")[1];
    console.log(`Tiến trình ${links.indexOf(link) + 1}/${links.length}`);
    update(hocphan_id, value);
  }
}
updates(links, value);
