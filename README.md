
Los scripts se organizan en una estructura de Modelo - Vista - Controlador y están divididos de manera que cada uno se dedique a una cosa concreta.

•	Modelo:
  o	userinput.js: dedicado a detectar los inputs  y pedir al Controlador que haga algo en función del tipo de input.
  o	hotzone.js: detecta los cambios de fase del juego y pide a controlador.js que haga las operaciones pertinentes.

•	Controlador:
  o	scenemanager.js: gestiona los cambios de escena y llama a inicializacion.js cuando es necesario reiniciar valores.
  o	controlador.js: encargado del grueso de la lógica del juego a nivel de cliente.
  o	inicializacion.js: asigna y reinicia valores a variables globales que tienen que inicializarse en momentos concretos posteriores a la carga de la página.
  o	multi.js: encargado de la comunicación entre cliente y servidor.

•	Vista:
  o	vista.js: genera outputs para que el usuario pueda saber qué está ocurriendo en cada momento.

•	Otros:
  o	libreria.js: contenedor de todos los textos que pueden salir en el juego.
  o	configuracion.js: almacena TODAS las variables globales con sus valores iniciales para evitar errores humanos. Las que necesiten reiniciarse en algún momento serán reinicializadas por inicializacion.js.


El flujo de la lógica es que el siguiente:

  1.	El Modelo detecta que tiene que pasar algo, ya sea por condiciones de la aplicación o por inputs del usuario. Entonces, pide al Controlador que gestione lo que tiene que pasar.
  2.	El Controlador calcula los cambios y pide a la Vista que los muestre.
  3.	La Vista muestra los cambios y espera a que el Modelo vuelva a detectar que tiene que pasar algo.

Sólo el Modelo puede llamar al Controlador y sólo el Controlador puede llamar a la Vista. La Vista no puede llamar a nada.


Debido a este esquema y a la lógica de la aplicación, el orden de carga de los scripts es:
libreria.js > configuracion.js > inicializacion.js > scenemanager.js > vista.js > controlador.js > userinput.js > hotzone.js > multi.js
