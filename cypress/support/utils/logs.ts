//________________________________________________________________________
// Comando predeterminado para que no ocurran errores de excepciones:

export function removeLogs() {
	// ** IMPORTA ESTA FUNCIÓN EN TUS PRUEBAS PARA EVITAR EL UNCAUGHT EXCEPTION Y LOS FETCH ABRUMADORES.
	Cypress.on('uncaught:exception', () => {
		// returning false here prevents Cypress from
		// failing the test
		return false;
	});
	// Comando predeterminado para que no aparezcan los Fetch en el log del Test Runner:
	Cypress.log = function (opts: Partial<Cypress.LogConfig>): Cypress.Log {
		if (opts.displayName === 'xhr' || opts.displayName === 'fetch') {
			return {} as Cypress.Log;
		} else {
			return Cypress.log(opts);
		}
	};
}
