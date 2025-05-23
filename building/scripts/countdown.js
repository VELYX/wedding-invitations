// Set the target date and time (YYYY-MM-DDTHH:MM:SS format)
const targetDate = new Date("2025-08-16T12:30:00").getTime();

// Update countdown every second
const countdownInterval = setInterval(() => {
   const now = new Date().getTime();
   const timeLeft = targetDate - now;

   if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdown").innerHTML = "🎉 Countdown Finished!";
      return;
   }

   const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
   const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

   document.getElementById("countdown").innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);