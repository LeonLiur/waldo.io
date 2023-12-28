import ClickArea from './ClickArea'
import { waldoSetterType, waldoType } from './util/util_types'

function WaldoImage({ waldo, setFoundWaldo }: { waldo: waldoType, setFoundWaldo: waldoSetterType }) {
    return (
        <div className='flex'>
            <div className="flex items-center justify-center w-10/12 relative">
                <img src={require(`../assets/${waldo.image_name}`)} alt="waldo"></img>
                <ClickArea className="absolute top-0 left-0 w-full h-full" waldo_box={waldo.waldo_box} setFoundWaldo={setFoundWaldo} />
            </div>
            <div className='w-2/12'>
                {/* <Timer /> */}
            </div>
        </div>
    )
}

export default WaldoImage