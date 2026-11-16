import React, { forwardRef } from 'react';
import IntlTelInput from '@intl-tel-input/react';
import spanish from 'intl-tel-input/locale/es';
import 'intl-tel-input/styles';
import './DemoPhoneInput.css';

async function lookupCountry() {
  const response = await fetch('https://ipapi.co/country/', {
    signal: AbortSignal.timeout(3000),
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
  });
  if (!response.ok) throw new Error('Country lookup unavailable');
  const country = (await response.text()).trim().toLowerCase();
  if (!/^[a-z]{2}$/.test(country)) throw new Error('Country not found');
  return country;
}

const loadUtils = () => import('intl-tel-input/utils');

const DemoPhoneInput = forwardRef(function DemoPhoneInput(props, ref) {
  return <div className="demo-phone-field">
    <label className="block text-sm font-medium" htmlFor="demo-phone">Teléfono</label>
    <div className="mt-2">
      <IntlTelInput
        ref={ref}
        initialCountryLookup={lookupCountry}
        loadUtils={loadUtils}
        uiTranslations={spanish}
        countryNameLocale="es"
        separateDialCode
        numberDisplayFormat="NATIONAL"
        strictMode={false}
        inputProps={{
          id: 'demo-phone', name: 'phone', required: true,
          autoComplete: 'tel-national', inputMode: 'tel', maxLength: 30,
          'aria-describedby': 'demo-phone-help',
          className: 'min-h-12 w-full rounded-md border border-slate-600 bg-slate-950/40 px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-300',
        }}
      />
    </div>
    <p id="demo-phone-help" className="mt-2 text-sm leading-relaxed text-slate-400">Ingresá tu número sin el prefijo internacional. Si hace falta, cambiá el país desde la bandera.</p>
  </div>;
});

export default DemoPhoneInput;
