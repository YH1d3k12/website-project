import "./styles.css";

export default function Footer () {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        <p className="footer-text">
          © {currentYear} LuxCode Studios. Todos os direitos reservados.
        </p>
        <p className="footer-dev">
          Desenvolvido por <span className="footer-highlight">Seu Nome</span>
        </p>
    </footer>
  );
};
