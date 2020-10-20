import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-allure/dist/setup";

configure({ adapter: new Adapter() });
