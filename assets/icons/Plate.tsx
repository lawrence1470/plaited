import Svg, { Path, Circle } from "react-native-svg";

export const PlateFilled = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
    >
      <Path
        d="M20.0568 12.4975C15.8776 12.4667 12.4517 15.8443 12.4211 20.0191C12.3906 24.1984 15.7633 27.6237 19.9427 27.6548C24.1219 27.6856 27.5478 24.3126 27.5784 20.1333C27.6094 15.9542 24.2315 12.5282 20.0573 12.4975H20.0568ZM18.5891 15.2967C17.2879 15.6606 16.1796 16.554 15.5445 17.75C15.4656 17.8991 15.3126 17.9823 15.1591 17.9779C15.0887 17.9779 15.0235 17.9645 14.9576 17.9295C14.7473 17.8159 14.6685 17.5571 14.7827 17.3426C15.5271 15.9452 16.8328 14.8942 18.3572 14.4691C18.5845 14.4033 18.8213 14.5349 18.8871 14.7671C18.9526 14.9947 18.817 15.2351 18.5891 15.2967L18.5891 15.2967ZM21.7605 25.6262C21.7126 25.6393 21.6688 25.6482 21.6207 25.6482C21.4412 25.6482 21.2743 25.53 21.2126 25.3505C21.1383 25.1268 21.2614 24.8818 21.4891 24.8071C23.241 24.2288 24.5247 22.7396 24.831 20.9255C24.8712 20.6891 25.0942 20.5316 25.3304 20.5709C25.5632 20.6103 25.7202 20.8333 25.6809 21.07C25.3219 23.1998 23.8199 24.9471 21.7605 25.6262L21.7605 25.6262Z"
        fill="black"
      />
      <Path
        d="M10.2619 20.0046C10.2217 25.3723 14.557 29.7731 19.9293 29.8142C25.2974 29.8549 29.6975 25.5192 29.7384 20.1468L29.7384 20.1468C29.7791 14.7786 25.4383 10.378 20.0715 10.3376C14.703 10.2969 10.3022 14.6325 10.2619 20.0046V20.0046ZM8.5003 19.9937C8.54657 13.6539 13.7434 8.5305 20.0829 8.57648L8.5003 19.9937ZM19.9175 31.5759C13.5728 31.5301 8.4547 26.3335 8.5003 19.9937L20.083 8.57648C26.4233 8.62324 31.5463 13.8196 31.4997 20.1591C31.4534 26.4985 26.2576 31.6219 19.9175 31.5759Z"
        fill="black"
        stroke="black"
      />
    </Svg>
  );
};

export const PlateOutline = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <Circle cx="20" cy="20" r="12" stroke="#2D2831" stroke-width="1.8" />
      <Circle
        cx="20"
        cy="19.9999"
        r="8.49207"
        stroke="#2D2831"
        stroke-width="1.5"
      />
      <Path
        d="M15.1194 17.5313L15.3337 17.1924L15.5551 16.8496L15.8765 16.4568L16.3121 16.0141L16.7805 15.6444L17.3691 15.2585L17.791 15.0554L18.1035 14.9265L18.4678 14.7964"
        stroke="#2D2831"
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <Path
        d="M25.264 20.9157L25.1191 21.5925L24.9326 22.0966L24.7392 22.511L24.4282 23.0082L23.9864 23.5953L23.4547 24.1178L23.0332 24.4338L22.7185 24.6452L22.2458 24.8937L21.5934 25.1611"
        stroke="#2D2831"
        stroke-width="1.2"
        stroke-linecap="round"
      />
    </Svg>
  );
};