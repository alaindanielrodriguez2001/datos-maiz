
const Footer = () => {
    return (
        <div className="flex bg-maiz text-white w-full h-[90px] bottom-0">
           
            <div className="container flex py-4 justify-center items-center">
               
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
        </div>

    );
};

export default Footer;
