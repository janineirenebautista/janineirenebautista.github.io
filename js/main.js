/* =========================================
   FEU Tech Personal Portfolio - Custom JS
   Author: Janine Irene P. Bautista
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* 1. Dark Mode Toggle Feature */
  const darkModeToggle = document.getElementById("darkModeToggle")
  const body = document.body

  const savedTheme = localStorage.getItem("portfolio_theme")
  if (savedTheme === "dark") {
    body.classList.add("dark-mode")
    if (darkModeToggle) {
      darkModeToggle.querySelector(".icon").textContent = "☀️"
      darkModeToggle.querySelector(".toggle-text").textContent = "Light"
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      body.classList.toggle("dark-mode")
      const isDarkMode = body.classList.contains("dark-mode")

      if (isDarkMode) {
        localStorage.setItem("portfolio_theme", "dark")
        darkModeToggle.querySelector(".icon").textContent = "☀️"
        darkModeToggle.querySelector(".toggle-text").textContent = "Light"
      } else {
        localStorage.setItem("portfolio_theme", "light")
        darkModeToggle.querySelector(".icon").textContent = "🌙"
        darkModeToggle.querySelector(".toggle-text").textContent = "Dark"
      }
    })
  }

  /* 2. Local Video Modal Feature for My Projects */
  const videoModalElement = document.getElementById("videoModal")
  const localVideoElement = document.getElementById("localProjectVideo")
  const videoSourceText = document.getElementById("videoSourceText")
  const videoModalLabel = document.getElementById("videoModalLabel")

  if (videoModalElement && localVideoElement) {
    const openVideoButtons = document.querySelectorAll(
      ".open-video-modal, .play-modal-btn",
    )

    openVideoButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const videoSrc = this.getAttribute("data-video-src")
        const projectTitle = this.getAttribute("data-project-title")

        if (videoModalLabel) videoModalLabel.textContent = projectTitle
        if (videoSourceText) videoSourceText.textContent = videoSrc

        const sourceElement = localVideoElement.querySelector("source")
        if (sourceElement) {
          sourceElement.src = videoSrc
          localVideoElement.load()
        }

        const modalInstance = new bootstrap.Modal(videoModalElement)
        modalInstance.show()
      })
    })

    videoModalElement.addEventListener("hidden.bs.modal", function () {
      localVideoElement.pause()
      localVideoElement.currentTime = 0
    })
  }

  /* 3. Coursework Screenshot Modal Feature (Exact names from your screenshot) */
  const screenshotModalElement = document.getElementById("screenshotModal")
  if (screenshotModalElement) {
    screenshotModalElement.addEventListener("show.bs.modal", function (event) {
      const card = event.relatedTarget
      if (!card) return

      const imgSrc = card.getAttribute("data-img-src")
      const title = card.getAttribute("data-title")
      const desc = card.getAttribute("data-desc")

      const modalImage = document.getElementById("modalActivityPreview")

      const modalTitle = document.getElementById("modalActivityTitle")
      const modalDesc = document.getElementById("modalActivityDesc")
      const modalAssetPath = document.getElementById("modalAssetPath")

      if (modalImage) modalImage.src = imgSrc
      if (modalTitle) modalTitle.textContent = title
      if (modalDesc) modalDesc.textContent = desc
      if (modalAssetPath) modalAssetPath.textContent = imgSrc
    })
  }

  /* 4. Frontend-only Contact Form Validation */
  const contactForm = document.getElementById("contactForm")
  const formSuccessAlert = document.getElementById("formSuccessAlert")

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault()
      event.stopPropagation()

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated")
        if (formSuccessAlert) formSuccessAlert.classList.add("d-none")
      } else {
        contactForm.classList.remove("was-validated")
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove("d-none")
        }
        contactForm.reset()

        setTimeout(function () {
          if (formSuccessAlert) formSuccessAlert.classList.add("d-none")
        }, 5000)
      }
    })
  }
})
