import { Divider, Typography } from "antd"
import HeroSlider from "../../components/hero-slider"
import ProductsSlider from "../../components/products";
import { useAppSelector } from "../../store/store";

const { Title } = Typography;

const HomePage = () => {
  const { recentProducts, hotsaleProducts, popularProducts } = useAppSelector(state=>state.products);
  return (
    <div>
        <HeroSlider />
        <Title className="title" level={2}>The Recent Products</Title>
        <Divider/>
        <ProductsSlider type='recent' data={recentProducts} />
        <Title className="title" level={2}>Hot Sales</Title>
        <Divider/>
        <ProductsSlider type='hotsales' data={hotsaleProducts} />
        <Title className="title" level={2}>Popular</Title>
        <Divider/>
        <ProductsSlider type='popular' data={popularProducts} />
    </div>
  )
}

export default HomePage