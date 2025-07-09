(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // WOW JS
  new WOW().init();

  // Sticky Navbar
$(window).scroll(function () {
  if ($(this).scrollTop() > 45 || window.innerWidth < 768) {
    $(".navbar").addClass("sticky-top shadow-sm");
  } else {
    $(".navbar").removeClass("sticky-top shadow-sm");
  }
});

  // Dropdown on hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });

    $("#videoModal").on("shown.bs.modal", function () {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function () {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Testimonials Carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
})(jQuery);



/////////////////////////////////////////////////////////////////////////////////////////////////
// ================== Login ==================
const logout = document.querySelector("#logout");
if (logout) {
  logout.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}

// ================== Get & Save Cart ==================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================== Add to Cart ==================
function addToCart(product) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert(" You must log in first before adding items to the cart. ⚠️");
    window.location.href = "login.html";
    return;
  }

  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  updateCartCounter();
}

// ================== Update Cart Counter ==================
function updateCartCounter() {
  const cart = getCart();
  const counterEl = document.getElementById("cart-count");
  if (counterEl) {
    counterEl.innerText = cart.length;
  }
}
updateCartCounter();

// ================== Listen to Add-to-Cart ==================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const product = {
      id: btn.dataset.id,
      title: btn.dataset.title,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.img,
    };
    addToCart(product);
  }
});

// ================== Menu Tabs Logic ==================
const lisMenu = document.querySelectorAll(".nav-pills .nav-item");

lisMenu.forEach((li) => {
  li.addEventListener("click", function () {
    const h6 = li.querySelector("h6");
    if (h6) {
      const mealType = h6.innerHTML.toLowerCase();
      getRecipes(mealType);
    }
  });
});

async function getRecipes(meal) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${meal}`
    );
    const data = await response.json();
    const recipes = data.data.recipes.slice(0, 8);
    displayMealInTab(meal, recipes);
  } catch (error) {
    // alert("Error fetching recipes: " + error.message);
  }
}

function displayMealInTab(meal, recipes) {
  const contentMap = {
    pizza: document.getElementById("pizza-content"),
    fish: document.getElementById("fish-content"),
    beef: document.getElementById("beef-content"),
  };

  const container = contentMap[meal];
  if (!container) return;

  let cards = "";
  recipes.forEach((recipe) => {
    cards += `
      <div class="col-lg-6">
        <div class="d-flex align-items-center">
          <img class="img-fluid rounded" src="${recipe.image_url}" alt="${recipe.title}" style="width: 80px" />
          <div class="w-100 d-flex flex-column text-start ps-4">
            <h5 class="d-flex justify-content-between border-bottom pb-2">
              <span>${recipe.title}</span>
              <div class="d-flex gap-3">
                <i
                  class="fa-solid fa-plus text-primary add-to-cart"
                  style="cursor:pointer"
                  data-id="${recipe.id}"
                  data-title="${recipe.title}"
                  data-price="100"
                  data-img="${recipe.image_url}"
                ></i>
                <span class="text-primary">100 EGP</span>
              </div>
            </h5>
            <small class="fst-italic">${recipe.publisher}</small>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = cards;
}

getRecipes("pizza");

// ================== Card Page Logic ==================
if (document.getElementById("cart-items")) {
  function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = getCart();
    let total = 0;
    let html = "";

    if (cart.length === 0) {
      html = `<div class="alert alert-info">No items in your cart yet.</div>`;
    } else {
      cart.forEach((item, index) => {
        html += `
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.title}" width="50" class="rounded" />
              <div>
                <h6 class="mb-1">${item.title}</h6>
                <small class="text-muted">${item.price} EGP</small>
              </div>
            </div>
            <div class="d-flex align-items-center gap-3">
              <strong>${item.price} EGP</strong>
              <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        total += Number(item.price);
      });
    }

    cartItemsContainer.innerHTML = html;
    document.getElementById("cart-total").innerText = total.toFixed(2);
    attachDeleteEvents();
  }

  function attachDeleteEvents() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.dataset.index);
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        displayCartItems();
        updateCartCounter();
      });
    });
  }

  function clearCart() {
    localStorage.removeItem("cart");
    displayCartItems();
    updateCartCounter();
  }

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }

  displayCartItems();
}

// ================== Checkout Logic ==================
const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.querySelector("input[type='text']").value.trim();
    const phone = document.querySelector("input[type='tel']").value.trim();
    const address = document.querySelector("textarea").value.trim();
    const paymentMethod = document.querySelector("select").value;

    if (!fullName || !phone || !address || !paymentMethod) {
      alert("Please fill Data");
      return;
    }

    alert(`\u2705 Order confirmed for ${fullName}!\nDelivery to: ${address}\nPayment method: ${paymentMethod}`);
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}
