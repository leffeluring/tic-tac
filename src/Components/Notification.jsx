import React from 'react';

function NotificationBar({ value }) {
  let message = null;

  if (value < 10) {
    message = 'Fifan boys, lets get drinking!';
  } else if (value > 10 && value <= 20) {
    message = 'Nu är vi igång';
  } else if (value > 20 && value <= 50) {
    message = 'Jag vill ha öl!';
  } else if (value > 50 && value <= 100) {
    message = 'Lite salongsberusad är man';
  }
  else if (value > 100 && value <= 200) {
    message = 'Luktar fan bag i luften';
  }
  else if (value > 200) {
    message = 'Måste fan spy nu alltså, sak bara på dass';
  }
  else if (value > 200) {
    message = <p></p>;
  }
  else if (value > 500) {
    message = <p>Knappt knackad</p>;
  }

  return (
    <div className="talk-bubble tri-right border round btm-right-in">
      <p>{message}</p>
    </div>
  );
}

export default NotificationBar;