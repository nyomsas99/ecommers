// Fungsi untuk menyimpan data cart ke localStorage
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

// Fungsi untuk memuat data cart dari localStorage
function loadCartFromLocalStorage() {
  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (savedCartItems) {
    savedCartItems.forEach((item) => {
      addProductToCart(item.title, item.price, item.img, item.quantity);
    });
    updateCartQuantity();
  }
}

// Tambahkan ini di dalam fungsi ready() untuk memuat data dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromLocalStorage(); // Muat data dari localStorage
  updateCartQuantity();
});

// Modifikasi fungsi di mana keranjang berubah untuk memanggil saveCartToLocalStorage()
function addCartClicked(event) {
  // Kode awal dari addCartClicked tetap
  addProductToCart(title, price, productImg);
  updatetotal();
  saveCartToLocalStorage(); // Simpan setelah menambahkan item
}

function removeCartItem(event) {
  // Kode awal dari removeCartItem tetap
  saveCartToLocalStorage(); // Simpan setelah menghapus item
}

function quantityChanged(event) {
  // Kode awal dari quantityChanged tetap
  saveCartToLocalStorage(); // Simpan setelah perubahan kuantitas
}

function buyButtonClicked() {
  // Kode awal dari buyButtonClicked tetap
  localStorage.removeItem("cartItems"); // Hapus data di localStorage setelah pembelian
}

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

// cart working
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// making function
function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  // button buy work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// buy button
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  itemCount = 0; // Reset jumlah item
  updateCartQuantity(); // Update tampilan jumlah item
  updatetotal();
}

// remove item from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  itemCount = Math.max(0, itemCount - 1); // Kurangi jumlah barang, minimum 0
  updateCartQuantity(); // Update tampilan jumlah item
  updatetotal();
}

// quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// add to cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
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
                    <input type="number" value="1" class="cart-quantity" />
                    </div>
                    <!-- remove cart -->
                    <i class="bx bxs-trash-alt cart-remove"></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  // Tambahkan 1 ke itemCount hanya ketika produk berhasil ditambahkan ke cart
  itemCount += 1;
  updateCartQuantity();
}

// update total
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

// Fungsi untuk memformat angka menjadi format Rupiah
function formatRupiah(number) {
  return "Rp." + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

// Inisialisasi jumlah item di keranjang
let itemCount = 0;

// Update tampilan jumlah item di ikon keranjang
function updateCartQuantity() {
  const cartQuantityElement = document.querySelector(".quantity");
  cartQuantityElement.textContent = itemCount;
  cartQuantityElement.style.display = itemCount > 0 ? "inline-block" : "none"; // Sembunyikan jika kosong
}

// Event listener untuk menambah barang ke keranjang
document.addEventListener("DOMContentLoaded", function () {
  updateCartQuantity();
});

function buyButtonClicked() {
  // Menampilkan modal untuk memilih metode pembayaran
  document.getElementById("payment-modal").style.display = "block";
}

// Menutup modal ketika tombol tutup diklik
document.getElementById("close-modal").onclick = function () {
  document.getElementById("payment-modal").style.display = "none";
};

// Menutup modal ketika pengguna mengklik di luar modal
window.onclick = function (event) {
  const modal = document.getElementById("payment-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Menambahkan fungsi untuk metode pembayaran yang dipilih
const paymentButtons = document.querySelectorAll(".payment-button");
paymentButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedPaymentMethod = this.textContent;
    alert("Metode Pembayaran yang dipilih: " + selectedPaymentMethod);
    // Di sini Anda bisa menambahkan logika lebih lanjut untuk proses pembayaran
    document.getElementById("payment-modal").style.display = "none"; // Tutup modal
  });
});
function buyButtonClicked() {
  const cartContent = document.getElementsByClassName("cart-content")[0];
  const cartBoxes = cartContent.getElementsByClassName("cart-box");

  if (cartBoxes.length === 0) {
    alert("Keranjang Anda kosong!");
    return; // Tidak ada produk di keranjang
  }

  let totalAmount = 0;
  let productDetails = "";

  // Mengumpulkan informasi semua produk di keranjang
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

    totalAmount += subtotal; // Menambahkan subtotal ke total

    // Menyiapkan detail produk untuk ditampilkan di modal
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

  // Mengupdate informasi produk yang dipilih
  document.querySelector(".selected-product-grid").innerHTML = productDetails;

  // Menampilkan total yang harus dibayar
  document.getElementById("total-amount").innerText =
    "Rp." + totalAmount.toLocaleString("id-ID");

  // Menampilkan modal untuk memilih metode pembayaran
  document.getElementById("payment-modal").style.display = "block";
}
