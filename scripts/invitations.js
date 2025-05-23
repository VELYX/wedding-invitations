const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "Guest";
    const decodedName = decodeURIComponent(name.trim());

    const webhookURL = "https://script.google.com/macros/s/AKfycbyZYi3NSZCtkV1NP8HBz8NWmZhRmMILdA3U9TFOnkiQbU7OsuWY_btre4d_rrNifg4V/exec"; // Replace with your actual URL

    document.getElementById("message").innerText = `Dear ${decodedName}, you are invited to our event.`;

    async function submitRSVP(willAttend) {
      const responseEl = document.getElementById("response");

      const payload = {
        name: decodedName,
        attending: willAttend
      };

      try {
        const res = await fetch(webhookURL, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await res.json();
        if (result.success) {
          const ticketMessage = result.tickets > 0
            ? `${result.tickets} ticket(s) have been reserved for you.`
            : "You were not found on the guest list.";

          responseEl.textContent = willAttend
            ? `🎉 Thank you! ${ticketMessage}`
            : "😢 Sorry you can’t make it.";

          document.getElementById("ticketInfo").innerText = ticketMessage;
        } else {
          responseEl.textContent = "⚠️ Error saving your RSVP.";
        }
      } catch (err) {
        responseEl.textContent = "⚠️ Failed to send RSVP.";
        console.error("Error:", err);
      }

      document.querySelectorAll("button").forEach(btn => btn.disabled = true);
    }

    document.getElementById("yesBtn").addEventListener("click", () => submitRSVP(true));
    document.getElementById("noBtn").addEventListener("click", () => submitRSVP(false));