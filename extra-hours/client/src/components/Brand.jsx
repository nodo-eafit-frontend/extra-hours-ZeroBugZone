import settingsIcon from '@assets/icons/settings.png';
import notificationsIcon from '@assets/icons/Notifications.png';

function Brand() {
  return (
    <header>
      <div className="brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <div style={{ color: 'rgb(52, 60, 106)', fontSize: 25, fontFamily: 'Libre Baskerville', fontWeight: '700' }}>
          AMADEUS
        </div>
        <div style={{ color: '#2B3674', fontSize: 25, fontFamily: 'Libre Baskerville', fontWeight: '700', textAlign: 'center', flex: 1 }}>
          Análisis Horas Extras
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <img src={settingsIcon} alt="Configuración de la página" />
          <img src={notificationsIcon} alt="Notificaciones" />
        </div>
      </div>
    </header>
  );
}

export default Brand;
