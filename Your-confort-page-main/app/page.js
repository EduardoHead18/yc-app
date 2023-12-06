import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen  p-4 sm:p-8 md:p-12 lg:p-24 bg-slate-800">
        <div className="w-full md:max-h-full overflow-hidden">
          <div className="flex flex-col sm:flex-row gap-10">
            <Image src="/assets/favicon.ico" width={60} height={60}></Image>
            <h1 className="text-6xl font-bold text-white">Your Confort</h1>
          </div>
          <p className="text-white mt-10 sm:mt-16 overflow-auto font-light opacity-70">
            Your Confort facilita la búsqueda de alojamiento para personas a
            través de una aplicación. Nos enfocamos en proporcionar una
            plataforma intuitiva y eficiente que conecte a los usuarios. con
            opciones de viviendas en renta, brindando una solución confiable y
            conveniente para cubrir sus necesidades de vivienda.
          </p>
          <h2 className="text-4xl text-black"></h2>
          <div className="mt-10 sm:mt-20">
            <a
              href="https://www.dropbox.com/scl/fi/f6pfstga3ftshq2tdbsbh/yourconfort.app.zip?rlkey=njuovf5xtiqvuldvc248l4ye4&dl=1"
              download
              className="block w-80 rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Descargar
            </a>
            <p></p>
          </div>
        </div>

        <div className="w-full mt-16 sm-mt-0 mb-4 flex justify-end max-h-full overflow-hidden">
          <Image
            className="rounded-xl "
            src="/assets/screen.png"
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
          />
          <Image
            className="rounded-xl"
            src="/assets/screen2.png"
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />
        </div>
      </main>
      <div className=" min-h-screen p-24 bg-slate-700">
        <h2 className="text-3xl text-center font-bold text-white">
          Términos y condiciones {" "}
        </h2>
        <p className="text-xl mt-16">Información general</p>
        <p className="text-white mt-12 overflow-auto font-light opacity-70">
          Este aviso de privacidad y confidencialidad describe cómo Easy Stay
          S.A. de C.V. recopila, utiliza y comparte la información personal de
          los usuarios de la aplicación Your Confort.
        </p>
        <p className="text-white mt-8 overflow-auto font-light opacity-70">
          En nuestra aplicación, nos comprometemos a proteger sus datos
          personales. Entendemos que la privacidad es de suma importancia para
          nuestros usuarios. Al utilizar nuestros servicios, usted acepta que
          podemos recopilar, utilizar y compartir sus datos personales según lo
          descrito en nuestro aviso de privacidad.
        </p>
        <p className="text-xl mt-16">Información que recopilamos</p>
        <p className="text-white mt-12 overflow-auto font-light opacity-70">
          Datos de registro: Recopilamos información básica de registro, como el
          nombre, apellidos, teléfono y la dirección de correo electrónico y la
          contraseña, cuando los usuarios se registran en la aplicación. También
          recopilamos los datos de la tarjeta bancaria para realizar pagos de
          los paquetes que ofrece el servicio.
        </p>
        <p className="text-xl mt-16">Cómo utilizamos la información</p>
        <p className="text-white mt-12 overflow-auto font-light opacity-70">
          Para proporcionar la aplicación: Utilizamos la información que
          recopilamos para proporcionar la aplicación y sus funciones, como
          permitir a los usuarios registrarse, iniciar sesión y utilizar las
          funciones de la aplicación. Así como también permitir realizar pagos
          de manera segura.
        </p>
        <p className="text-white mt-12 overflow-auto font-light opacity-70">
          Para cumplir con la ley: Podemos utilizar la información que
          recopilamos para cumplir con las leyes aplicables, como las leyes de
          protección de datos.
        </p>
        <p className="text-xl mt-16">Seguridad de la información</p>
        <p className="text-white mt-12 overflow-auto font-light opacity-70">
          Para proporcionar la aplicación: Utilizamos la información que
          recopilamos para proporcionar la aplicación y sus funciones, como
          permitir a los usuarios registrarse, iniciar sesión y utilizar las
          funciones de la aplicación. Así como también permitir realizar pagos
          de manera segura.
        </p>
      </div>
    </>
  );
}
