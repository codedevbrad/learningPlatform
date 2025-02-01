import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function SliderCustom ( { title , state , setState }) {
    return  (
        <div className="mt-4">
        <label className="block mb-2 font-medium"> { title } </label>
        <Slider
          defaultValue={[state]}
          max={100}
          step={1}
          onValueChange={(value) => setState(value[0])}
          className="slider-custom"
        />
      </div>
    )
}