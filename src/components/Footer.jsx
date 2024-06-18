
const Footer = () => {
    return (
        <footer className="flex bg-amber-600 text-white">
            <div className="container flex py-4 justify-center">
                <p className="mx-10">
                    © {new Date().getFullYear()} Universidad Central de Las Villas, Facultad de Ciencias Agropecuarias.
                </p>

                <img
                    src="/images/facultad.jpg"
                    alt="facultad-image"
                    width={100}
                    height={60}
                    className="mx-10"
                />

            </div>
        </footer>

    );
};

export default Footer;
