// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
let quantity = document.querySelector(".quantity");

cartIcon.onclick = () => {
  cart.classList.add("active");
};
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Fungsi penyimpanan cart ke localStorage
function saveCartToLocalStorage() {
  const cartItems = [];
  const cartBoxes = document.querySelectorAll(".cart-box");

  cartBoxes.forEach((cartBox) => {
    const productImg = cartBox.querySelector(".cart-img").src;
    const productTitle = cartBox.querySelector(".cart-product-title").innerText;
    const productPrice = cartBox.querySelector(".cart-price").innerText;
    const productQuantity = cartBox.querySelector(".cart-quantity").value;

    cartItems.push({
      img: productImg,
      title: productTitle,
      price: productPrice,
      quantity: productQuantity,
    });
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Fungsi memuat cart dari localStorage
function loadCartFromLocalStorage() {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (savedCartItems) {
    savedCartItems.forEach((item) => {
      addProductToCart(item.title, item.price, item.img, item.quantity);
    });
    updateCartQuantity();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage(); // Muat data dari localStorage
  updateCartQuantity();
});

// Function utama saat dokumen siap
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Fungsi untuk membeli produk
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  itemCount = 0;
  updateCartQuantity();
  updatetotal();
  localStorage.removeItem("cartItems"); // Hapus dari localStorage setelah pembelian
}

// Fungsi hapus item dari cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  itemCount = Math.max(0, itemCount - 1);
  updateCartQuantity();
  updatetotal();
  saveCartToLocalStorage();
}

// Fungsi perubahan quantity
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  saveCartToLocalStorage();
}

// Fungsi saat add to cart ditekan
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg, 1);
  updatetotal();
  saveCartToLocalStorage();
}

function addProductToCart(title, price, productImg, quantity = 1) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart");
      return;
    }
  }

  var cartBoxContent = `<img src="${productImg}" alt="" class="cart-img" />
                    <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="${quantity}" class="cart-quantity" />
                    </div>
                    <i class="bx bxs-trash-alt cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  itemCount += 1;
  updateCartQuantity();
}

// Update total harga
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(
      priceElement.innerText.replace("Rp.", "").replace(".", "")
    );
    var quantity = quantityElement.value;
    total += price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText =
    formatRupiah(total);
}

// Fungsi format Rupiah
function formatRupiah(number) {
  return "Rp." + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Inisialisasi item count dan update ikon keranjang
let itemCount = 0;
function updateCartQuantity() {
  const cartQuantityElement = document.querySelector(".quantity");
  cartQuantityElement.textContent = itemCount;
  cartQuantityElement.style.display = itemCount > 0 ? "inline-block" : "none";
}

document.addEventListener("DOMContentLoaded", ready);
function buyButtonClicked() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");

  // Jika keranjang kosong, beri peringatan
  if (cartBoxes.length === 0) {
    alert("Keranjang Anda kosong!");
    return;
  }

  // Hitung total dan tampilkan modal
  let totalAmount = 0;
  let productDetails = "";

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const productTitle =
      cartBox.getElementsByClassName("cart-product-title")[0].innerText;
    const productImg = cartBox.getElementsByClassName("cart-img")[0].src;
    const priceElement = cartBox.getElementsByClassName("cart-price")[0];
    const quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

    const price = parseFloat(
      priceElement.innerText.replace("Rp.", "").replace(/\./g, "").trim()
    );
    const quantity = quantityElement.value;
    const subtotal = price * quantity;

    totalAmount += subtotal;

    productDetails += `
      <div>
          <img src="${productImg}" alt="${productTitle}" class="product-img" />
          <div>
              <h3>${productTitle}</h3>
              <p>Nominal yang harus dibayar: Rp.${subtotal.toLocaleString(
                "id-ID"
              )}</p>
          </div>
      </div>
    `;
  }

  // Menampilkan produk dan total di modal
  document.querySelector(".selected-product-grid").innerHTML = productDetails;
  document.getElementById("total-amount").innerText =
    "Rp." + totalAmount.toLocaleString("id-ID");

  // Tampilkan modal buy
  document.getElementById("payment-modal").style.display = "block";
}

// Menutup modal buy saat transaksi selesai
document.getElementById("close-modal").onclick = function () {
  document.getElementById("payment-modal").style.display = "none";
};

// Tambahkan event listener untuk tombol beli di dalam modal
const paymentButtons = document.querySelectorAll(".payment-button");
paymentButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedPaymentMethod = this.textContent;
    alert(
      "Pembelian sukses dengan metode pembayaran: " + selectedPaymentMethod
    );

    // Kosongkan keranjang dan hapus dari localStorage setelah transaksi selesai
    const cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
      cartContent.removeChild(cartContent.firstChild);
    }

    itemCount = 0;
    updateCartQuantity();
    updatetotal();

    // Hapus data keranjang dari localStorage
    localStorage.removeItem("cartItems");

    // Tutup modal setelah pembelian
    document.getElementById("payment-modal").style.display = "none";
  });
});

// Fungsi untuk memformat angka menjadi format Rupiah untuk harga
function formatRupiah(number) {
  return "Rp." + parseInt(number, 10).toLocaleString("id-ID");
}

// Format harga produk saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  const priceElements = document.querySelectorAll(".price");
  priceElements.forEach((priceElement) => {
    const priceValue = priceElement.textContent.replace("Rp.", "").trim();
    priceElement.textContent = formatRupiah(priceValue);
  });

  // Format total harga jika sudah ada nilainya
  const totalPriceElement = document.querySelector(".total-price");
  const totalValue = totalPriceElement.textContent.replace("Rp.", "").trim();
  totalPriceElement.textContent = formatRupiah(totalValue);
});

// Pastikan skrip ini dijalankan setelah elemen navbar tersedia di halaman
window.addEventListener("load", function () {
  const navbarText = document.querySelector(".logo");
  navbarText.classList.add("show");
});
window.addEventListener("load", function () {
  const navbarText = document.querySelector(".logo");

  // Tambahkan animasi "typing" saat halaman dimuat
  navbarText.classList.add("show");

  // Menghapus animasi "typing" dan menambahkan kelas `hide` untuk efek hilang
  setTimeout(() => {
    navbarText.classList.add("hide");
  }, 5000); // Menghilang setelah 5 detik, sesuaikan waktunya sesuai kebutuhan
});
