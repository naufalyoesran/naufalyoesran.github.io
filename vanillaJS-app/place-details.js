const heart = document.querySelector("#heart");
const showModal = document.querySelector("#show-modal");
const modal = document.querySelector("#modal");
const message = localStorage.getItem("message");

heart.addEventListener("click", () => {
  heart.classList.toggle("clicked-heart");
});

showModal.addEventListener("click", () => {
  if (message) {
    modal.innerHTML = `
    <div>
        <h2>Send message to Kayla Hand</h2>
        <svg id="closeModal" style="color: white" width="24" height="24">
            <use xlink:href="icons/x-circle.svg#img"></use>
        </svg>
    </div>
    <form>
        <textarea id="textareaModal" placeholder="Write your message here">${message}</textarea>
        <button type="submit" id="send">Send message</button>
    </form>
    `;
  } else {
    modal.innerHTML = `
        <div>
            <h2>Send message to Kayla Hand</h2>
            <svg id="closeModal" style="color: white" width="24" height="24">
                <use xlink:href="icons/x-circle.svg#img"></use>
            </svg>
        </div>
        <form>
            <textarea id="textareaModal" placeholder="Write your message here"></textarea>
            <button type="submit" id="send">Send message</button>
        </form>
        `;
  }
  modal.classList.add("modal");
  const closeModal = document.querySelector("#closeModal");
  const textareaModal = document.querySelector("#textareaModal");
  const send = document.querySelector("#send");

  closeModal.addEventListener("click", () => {
    modal.innerHTML = ``;
    modal.classList.remove("modal");

    localStorage.setItem("message", textareaModal.value);
  });

  send.addEventListener("click", () => {
    localStorage.removeItem("message");
  });
});
