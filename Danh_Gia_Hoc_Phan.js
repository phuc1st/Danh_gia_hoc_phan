// Code bới Phúc hơi đen
/*level 
1-Hoàn toàn ko đồng ý
2-Không đồng ý
3-Đồng ý 1 phần
4-Đồng ý
5-Hoàn toàn đồng ý
Mục doKhoMonHoc... mặc định để trống, ưng thì điền vào
ví dụ độ khó môn học = địa ngục
*/
console.log(
  "thằng nào có tiền thì nạp tiền vào donate cho tao ít thì 5 quả trứng nhiều thì 1 tên lửa.."
);
let level = "5";
let doKhoMonHoc = "";
let giaoTrinh = "";
let giangVien = "";
let coSoVatChat = "";

let formData = new URLSearchParams();
for (let i = 2; i <= 31; i++) {
  formData.append(`traloi[${i}][]`, level);
}

formData.append("tuluan[]", doKhoMonHoc);
formData.append("tuluan[]", giaoTrinh);
formData.append("tuluan[]", giangVien);
formData.append("tuluan[]", coSoVatChat);

function sendFormData() {
  let link_list = Array.from(
    document.querySelectorAll(
      'a[href*="https://daotao.vku.udn.vn/sv/khao-sat/cau-hoi-khao-sat/"]'
    )
  );
  let links = link_list.map((link) => link.href);

  links.forEach((link, i) => {
    console.log(`Tiến trình ${i + 1}/${links.length}`);
    fetch(link)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const form = doc.querySelector("form#demo-form2");
        const action = form.getAttribute("action");
        const token = doc.querySelector('input[name="_token"]').value;
        const idlop = doc.querySelector("#idlop").value;

        formData.set("_token", token);
        formData.set("idlop", idlop);

        return fetch(action, {
          method: "POST",
          cache: "no-cache",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData,
        });
      })
      .then((response) => {
        if (!response.ok) {
          console.log(`Học phần ${i + 1}/${links.length} thất bại!`);
        } else console.log(`Học phần ${i + 1}/${links.length} thành công!`);
        resolve();
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
}

sendFormData();
