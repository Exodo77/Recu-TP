import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_hpk6c6f';
const EMAILJS_TEMPLATE_ID = 'template_tsyxx1b';
const EMAILJS_PUBLIC_KEY = 'Zkfw7iGzewCY81DAE';

export default function App() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: '', message: '' });

    const formData = new FormData(formRef.current);
    const templateParams = {
      name: formData.get('user_name'),
      from_name: formData.get('user_name'),
      user_name: formData.get('user_name'),
      email: formData.get('user_email'),
      user_email: formData.get('user_email'),
      reply_to: formData.get('user_email'),
      title: formData.get('subject'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus({
        type: 'success',
        message: 'Mensaje enviado correctamente.',
      });
      formRef.current.reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'No se pudo enviar el mensaje. Verifique la conexion e intente nuevamente.',
      });
      console.error('EmailJS error:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <div className="header-content">
          <h1>Universidad UPATECO</h1>
          <p>Portal de Contacto y Ubicacion de la Sede</p>
        </div>
      </header>

      <main className="main-container">
        <section className="contact-card" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Formulario de Contacto</h2>
          <p className="section-subtitle">
            Complete el formulario para enviar su consulta por correo electronico.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="user_name">Nombre completo</label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                placeholder="Ej. Juan Perez"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_email">Correo electronico</label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Motivo de la consulta"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Escriba su mensaje aqui..."
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              {isSending ? 'Enviando...' : 'Enviar mensaje'}
            </button>

            {status.message && (
              <div
                className={`status-banner ${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </div>
            )}
          </form>
        </section>

        <section className="map-card" aria-labelledby="map-heading">
          <h2 id="map-heading">Ubicacion</h2>
          <p className="section-subtitle">
            Universidad Provincial de Administracion, Tecnologia y Oficios (UPATECO) - Salta
          </p>
          <div className="map-container">
            <iframe
              title="Mapa de ubicacion de Universidad UPATECO"
              src="https://www.google.com/maps?q=Universidad+UPATECO+Salta&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
