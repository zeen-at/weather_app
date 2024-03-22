


const Hours = () => {


    const Hours = [{ hour: '00:00', temp: "temps" }, { hour: '01:00', temp: "temps" }, { hour: '02:00', temp: "temps" }, { hour: '03:00', temp: "temps" }, { hour: '04:00' , temp: "temps"},
    { hour: '05:00', temp: "temps" }, { hour: '06:00', temp: "temps" }, { hour: '07:00' , temp: "temps"}, { hour: '08:00' , temp: "temps"}, { hour: '09:00' , temp: "temps"},
    { hour: '10:00', temp: "temps" }, { hour: '11:00', temp: "temps" }, { hour: '12:00', temp: "temps" }, { hour: '13:00', temp: "temps" }, { hour: '14:00', temp: "temps" },
    { hour: '15:00', temp: "temps" }, { hour: '16:00', temp: "temps" }, { hour: '17:00', temp: "temps" }, { hour: '18:00', temp: "temps" }, { hour: '19:00', temp: "temps" },
    { hour: '20:00', temp: "temps" }, { hour: '21:00' , temp: "temps"}, { hour: '22:00' , temp: "temps"}, { hour: '23:00' , temp: "temps"}]

  return (

    // Hourly forecast isn't free

    <section className="flex gap-6 py-6 overflow-scroll">

        {Hours.map(({hour, temp}) => (
             <div key={hour} className="bg-blue-100 py-2 px-6 rounded-lg font-light">
             <p>{hour}</p>
             <p className="text-xl font-bold">Icon</p>
             <p>{temp}</p>
         </div>
        ))}
       
      
    </section>
  )
}

export default Hours;
