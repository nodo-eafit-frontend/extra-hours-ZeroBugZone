import settingsIcon from '../assets/icons/settings.png';
import notificationsIcon from '../assets/icons/Notifications.png';

function Brand() {
  return (
    <header>
      <div className="brand" style={{ color: 'rgb(52, 60, 106)', fontSize: 25, fontFamily: 'Libre Baskerville', fontWeight: '700', wordWrap: 'break-word' }}>
        AMADEUS
        <span className="brand_span" style={{ color: '#2B3674', fontSize: 25, fontFamily: 'Libre Baskerville', fontWeight: '700', wordWrap: 'break-word' }}>Análisis Horas Extras</span>
        <img src={settingsIcon} alt="Configuración de la página" />
        <img src={notificationsIcon} alt="Notificaciones" />
      </div>
    </header>
  );
}

export default Brand;

