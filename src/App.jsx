import { useState ,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { sayiMax, sayiMin } from "./store/site";

class Network {
  constructor(statusGet) {
      this.statusGet =  statusGet;
  }
}


function App() {
  const [data, setData] = useState(null);
  const [sonuc, setSonuc] = useState(null);
  const [isded, setİsded] = useState(false);
  const [value, setValue] = useState([]);
  const [miktar, setMiktar] = useState("");
  const [kurDegeri, setKurDegeri] = useState()
  const [selectedOption, setSelectedOption] = useState(null);
  const [input, setİnput] = useState(false)
  const [istek, setİstek] = useState(false)

  const { dolar, euro,result} = useSelector((state) => state.site);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://hasanadiguzel.com.tr/api/kurgetir", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async ( res) => {
        const fetchedData = await res.json();
        setValue([
          fetchedData.TCMB_AnlikKurBilgileri[0].BanknoteBuying,
           fetchedData.TCMB_AnlikKurBilgileri[3].BanknoteBuying,
        ]);
        setİstek(true)
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  }, [kurDegeri,selectedOption]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
      let liste = document.querySelector("#kurListesi");
      let data1 = liste.children[1].value;
    if (data1) {
      setİnput(true)
      console.log('first deger,',e.target.value)
      setSelectedOption(e.target.value)
    }else if(value[1]){
      setSelectedOption(e.target.value)
      console.log('second deger',e.target.value)
    }
  };

 
  const Hesapla = (e) => {
    setİsded(true);
    e.preventDefault();
    console.log('hesapla button', selectedOption)
    console.log("hesapla", new Network(200).statusGet);
    const data = document.querySelector("#kurListesi");
    let paraBirimi = 1 - 1;
    if (selectedOption === data[1].value) {
      paraBirimi = Number(data[1].value  * kurDegeri).toFixed(2)
      setSonuc(paraBirimi);

    } else if (selectedOption === data[2].value) {
      paraBirimi = Number(data[2].value  * kurDegeri).toFixed(2)
      setSonuc(paraBirimi);
    }
    return paraBirimi;
  };


  const ClearPara = (e) => {
    setKurDegeri('')
    setSonuc(' ')
    setİsded(false)
  }; 

  return (
    <div className=" flex justify-center  h-screen  bg-gray-1 mt-16 "  >
      <div className="text-center">
      <div className="flex flex-cols "></div>
          <form onSubmit={Hesapla} className='w-64 '>
            <div className='text-center  text-2xl text-green-500 font-bold'>Dolar ve Euro  <br/> <p className='font-semibold text-red-500'>Hesapla</p>  </div>
          <div>
            {istek == false ? (<div className='text-2xl text-blue-500 font-bold border bg-black px-3 py-3' >PARA VERİSİ YÜKLENİYOR BEKLE...</div>): (
              <select onChange={handleOptionChange}  id="kurListesi" className="border w-32 bg-white shadow-md text-center rounded-md focus:outline-none w-full mb-4 h-16 text-2xl mt-4">
              <option value={'Para birimi Seç'} select >Para birimi Seç</option>
                    <option value={`${value[0]}`} >$ {value[1 - 1]}</option>
                    <option value={`${value[1]}`}>€ {value[1]}</option>
              </select> 
             )}
            </div>
            <label
              htmlFor=""
              className="text-4xl font-normal text-red-500  w-4 translate-y-1/4 font-bold   text-center  focus:outline-none w-full mb-4 h-16 text-2xl mt-4"
            >
              X
            </label>
            <input
              type="number"
              placeholder="₺"
              className="border w-32 text-3xl font-bold bg-white shadow-md text-center rounded-md focus:outline-none w-full mb-4 h-16 mt-4 "
              value={kurDegeri}
              onChange={(e) => setKurDegeri(e.target.value)}
              />
              <div className="flex justify-center">
              <button
                           type="submit"
                           className="h-16 w-full text-2xl  font-bold bg-green-500 text-white rounded-md py-2 px-4 mt-4 mr-4 hover:bg-green-600 focus:outline-none"
                         >
              Hesapla
              </button>
              <button
                           type="button"
                           onClick={ClearPara}
                           className="h-16 text-2xl font-bold w-full bg-red-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-red-600 focus:outline-none"
                         >
                      Temizle
                    </button>
                 </div>
               </form>
              {isded && (
                  <div className="px-2 py-2 mt-4 bg-pink-200">
                    <h1 className="text-4xl text-center">{sonuc}</h1>
                  </div>
                )}
           </div>
    </div>
    );
  }

export default App;
