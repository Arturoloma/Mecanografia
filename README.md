
Los scripts se basan en una estructura de Modelo - Vista - Controlador y están divididos de manera que cada uno se dedique a una cosa concreta.

* Modelo:
  - userinput.js      =>   Dedicado a detectar los inputs durante el juego y pedir a controlador.js que haga algo en función del tipo de input.
  - hotzone.js        =>   Detecta los cambios de fase del juego y pide a controlador.js que haga las operaciones pertinentes.
  - scenemanager.js   =>   Detecta cuándo se dan las condiciones para que se cambie de escena y requiere el cambio.

* Controlador:
  - controlador.js    =>   Encargado del grueso de la lógica de la aplicación.
  - inicializacion.js =>   Asigna y reinicia valores a variables globales que tienen que inicializarse en momentos concretos posteriores a la carga de la página.

* Vista:
  - vista.js          =>   Genera outputs para que el usuario pueda saber qué está ocurriendo en cada momento.

* Otros:
  - libreria.js       =>   Contenedor de todos los textos que pueden salir en el juego.
  - configuracion.js  =>   Almacena TODAS las variables globales con sus valores iniciales para evitar errores humanos. Las que necesiten reiniciarse en algún momento serán reinicializadas por inicializacion.js.



El esquema lógico es que el siguiente:

  1. El Modelo detecta que tiene que pasar algo, ya sea por condiciones de la aplicación o por inputs del usuario. Entonces, pide al Controlador que gestione lo que tiene que pasar.
  2. El Controlador calcula los cambios y pide a la Vista que los muestre.
  3. La Vista muestra los cambios y se espera a que el Modelo vuelva a detectar que tiene que pasar algo.

Sólo el Modelo puede llamar al Controlador y sólo el Controlador puede llamar a la Vista. La Vista no puede llamar a nada.



Debido a este esquema y a la lógica de la aplicación, el orden de carga de los scripts es:
libreria.js > configuracion.js > inicializacion.js > scenemanager.js > vista.js > controlador.js > userinput.js > hotzone.js
