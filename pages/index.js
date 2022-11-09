import {Sidebar} from "../components/sidebar/Sidebar";
import {FinancialTotal} from "../components/sections/FinancialTotal/FinancialTotal";
import {FinancialProduct} from "../components/sections/financialProduct/FinancialProduct";

export default function Home() {
  return (
    <>
      <Sidebar/>
      <FinancialProduct/>
    </>
  )
}
