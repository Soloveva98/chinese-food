import React from 'react';

const Contacts: React.FC = () => {
	return (
		<div className="contacts">
			<iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9172.118738142844!2d82.97972170927356!3d54.91995121404217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1681114598208!5m2!1sru!2sru" loading="lazy"></iframe>
			<b className="number">8 800 333-36-62</b>
			<p><span>ул. Зорге, 70-72</span></p>
			<p>Доставка и самовывоз 10:00 — 23:00</p>
		</div>
	)
};

export default Contacts;