import { useEffect } from "react";
import Vue from './Vue';

const Component = () => {
  useEffect(() => {
    new Vue({
			el: '#app',
			data: {
				name: '大鹏',
				age: 21,
				info: {
					a: "共产主义接班人",
				}
			},
		})
  }, []);

  return null
};

export default Component;