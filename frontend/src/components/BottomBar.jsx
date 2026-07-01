import "./BottomBar.css";

function BottomBar() {
  return (
    <div id="bottom">
      <div id="info5">
        <h3>You can visit my social media by clicking the links below</h3>
      </div>

      <div className="socials">
        <a href="https://www.facebook.com/share/1AmU9NSbuu/" class="facebook" target="_blank">
          <i className="fa-brands fa-facebook-f"></i>
        </a>

        <a href="https://www.instagram.com/ajaysingh17242002?igsh=NDdzd3Axd3VnZjY5" class="instagram" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>

        <a href="https://x.com/AjaySingh151152" class="twitter" target="_blank">
          <i className="fa-brands fa-x-twitter"></i>
        </a>

        <a href="https://www.linkedin.com/in/ajay-singh-408b1326a?utm_source=share_via&utm_content=profile&utm_medium=member_android" class="linkedin" target="_blank">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>

      <div id="info6">
        <p id="pb">© 2026 Ajay Singh. All rights reserved.</p>
      </div>
    </div>
  );
}

export default BottomBar;