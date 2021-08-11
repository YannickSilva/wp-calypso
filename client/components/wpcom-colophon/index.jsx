import classNames from 'classnames';
import React from 'react';

import './style.scss';

const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="297" height="45" viewBox="0 0 297 45">
		<path d="M158.5 11.4C156.3 11.4 154.1 12.1 152.2 13.3 150.4 14.5 148.9 16.2 148.1 18.3 147.2 20.3 147 22.5 147.4 24.7 147.9 26.8 148.9 28.8 150.5 30.3 152.1 31.9 154.1 32.9 156.3 33.4 158.5 33.8 160.8 33.6 162.9 32.7 164.9 31.9 166.7 30.5 167.9 28.6 169.2 26.8 169.8 24.7 169.8 22.5 169.8 19.6 168.6 16.8 166.5 14.7 164.4 12.6 161.5 11.4 158.5 11.4V11.4ZM148.4 22.5C148.3 21.1 148.6 19.7 149.2 18.5L154.1 31.4C152.4 30.6 150.9 29.4 149.9 27.8 148.9 26.2 148.3 24.4 148.4 22.5V22.5ZM158.5 32.4C157.5 32.5 156.6 32.3 155.7 32L158.7 23.4 161.8 31.7 161.9 31.9C160.8 32.3 159.7 32.4 158.5 32.4ZM159.9 17.8C160.5 17.8 161.1 17.7 161.1 17.7 161.6 17.7 161.6 16.9 161 16.9 161 16.9 159.4 17 158.3 17 157.3 17 155.6 16.9 155.6 16.9 155.1 16.9 155 17.7 155.6 17.7 155.6 17.7 156.1 17.8 156.6 17.8L158.2 22.1 156 28.6 152.3 17.8C152.9 17.8 153.4 17.7 153.4 17.7 154 17.7 153.9 16.9 153.4 16.9 153.4 16.9 151.7 17 150.7 17H150C150.8 15.8 151.9 14.8 153.1 14.1 154.4 13.3 155.8 12.8 157.3 12.6 158.7 12.5 160.2 12.6 161.6 13 163 13.5 164.3 14.2 165.4 15.2H165.3C164.3 15.2 163.5 16 163.5 16.9 163.5 17.8 164 18.4 164.6 19.2 165.1 20.1 165.4 20.8 165.4 22 165.4 22.9 165.1 23.9 164.6 25.2L163.6 28.5 159.9 17.8ZM163.6 31.1L166.7 22.3C167.3 20.9 167.5 19.8 167.5 18.7 167.5 18.4 167.5 18.1 167.4 17.7 168.7 20 169 22.7 168.3 25.2 167.6 27.7 165.9 29.8 163.6 31.1Z" />
		<path d="M247.4 22.9C247.4 22.3 248 22.1 248.7 22.1 249.5 22.1 250.2 22.2 251 22.4V20.8C250.2 20.6 249.4 20.5 248.6 20.5 246.7 20.5 245.3 21.4 245.3 22.9 245.3 25.7 249.3 25 249.3 26.3 249.3 27 248.7 27.2 247.7 27.2 247.1 27.2 246.1 26.9 245.3 26.7V28.3C246.1 28.6 246.9 28.7 247.7 28.8 249.6 28.8 251.4 28.2 251.4 26.3 251.4 23.5 247.4 24.2 247.4 22.9V22.9ZM257.9 24.6C257.9 22.7 258.9 22.1 260.1 22.1 260.9 22.1 261.7 22.3 262.4 22.6V20.9C261.6 20.6 260.9 20.5 260.1 20.5 257.4 20.5 255.8 22.1 255.8 24.7 255.8 27.2 257 28.8 260 28.8 260.8 28.8 261.7 28.6 262.5 28.3V26.7C261.6 27 260.9 27.2 260.2 27.2 258.9 27.2 257.9 26.6 257.9 24.6V24.6ZM200.5 22H200.5V20.7H198.6V28.6H200.6V23.9C201.2 22.7 202 22.4 203.2 22.4H203.4V20.7C203.3 20.6 203.1 20.6 202.9 20.6 201.8 20.6 201.1 21 200.5 22ZM225.5 22H225.5V20.7H223.6V28.6H225.6V23.9C226.2 22.7 227 22.4 228.3 22.4H228.5V20.7C228.3 20.6 228.1 20.6 227.9 20.6 226.8 20.6 226.1 21 225.5 22V22ZM283.2 20.5C282.4 20.5 281.4 21 280.5 21.6L280.3 21.7C279.8 20.8 279 20.5 278.1 20.5 277.2 20.5 276.2 20.9 275.3 21.5V20.7H273.4V28.6H275.5V22.9C276.2 22.4 277 22.1 277.6 22.1 278.1 22.1 278.6 22.5 278.6 23.6V28.6H280.6V22.9C281.4 22.5 282.2 22.1 282.7 22.1 283.3 22.1 283.8 22.5 283.8 23.6V28.6H285.8V23.1C285.8 21.6 284.9 20.5 283.2 20.5V20.5ZM267.8 27.2C266.5 27.2 265.8 26.4 265.8 24.6 265.8 22.9 266.5 22.1 267.8 22.1 269.1 22.1 269.8 22.9 269.8 24.6 269.8 26.4 269.1 27.2 267.8 27.2ZM267.8 20.5C265 20.5 263.7 22.2 263.7 24.6 263.7 27 265 28.8 267.8 28.8 270.5 28.8 271.8 27 271.8 24.6 271.8 22.2 270.5 20.5 267.8 20.5ZM240.1 22.9C240.1 22.3 240.8 22.1 241.5 22.1 242.2 22.1 243 22.2 243.7 22.4V20.8C242.9 20.6 242.1 20.5 241.3 20.5 239.4 20.5 238 21.4 238 22.9 238 25.7 242 25 242 26.3 242 27 241.4 27.2 240.5 27.2 239.9 27.2 238.8 26.9 238.1 26.7V28.3C238.8 28.6 239.6 28.7 240.4 28.8 242.3 28.8 244.1 28.2 244.1 26.3 244.1 23.5 240.1 24.2 240.1 22.9V22.9ZM231.5 23.8C231.6 22.7 232.2 22 233.2 22 234.2 22 234.6 22.8 234.6 23.8H231.5ZM233.2 20.5C230.6 20.5 229.3 22.5 229.3 24.6 229.3 27.5 230.9 28.8 233.4 28.8 234.4 28.8 235.4 28.6 236.4 28.3V26.7C235.5 27 234.8 27.2 234 27.2 232.5 27.2 231.5 26.8 231.4 25.1H236.6C236.6 24.7 236.6 24.3 236.6 23.9 236.6 22.2 235.7 20.5 233.2 20.5ZM218.2 23.1H216.6V19.1H218.2C219.5 19.1 220.1 19.8 220.1 21.1 220.1 22.3 219.5 23.1 218.2 23.1V23.1ZM218.2 17.5H214.5V28.6H216.6V24.7H218.2C220.6 24.7 222.4 23.4 222.4 21.1 222.4 18.7 220.6 17.5 218.2 17.5ZM210 26.3C209.4 26.9 208.8 27.2 208.1 27.2 207 27.2 206.3 26.5 206.3 24.8 206.3 23.1 207.2 22.1 208.7 22.1 209.2 22.1 209.6 22.2 210 22.3V26.3ZM210 20.7C209.5 20.6 209 20.5 208.5 20.5 205.8 20.5 204.3 22.3 204.3 24.9 204.3 27.6 205.8 28.8 207.6 28.8 208.5 28.7 209.4 28.4 210.1 27.8V28.6H212V17.5H210V20.7ZM192.9 27.2C191.6 27.2 190.9 26.4 190.9 24.6 190.9 22.9 191.6 22.1 192.9 22.1 194.2 22.1 194.9 22.9 194.9 24.6 194.9 26.4 194.2 27.2 192.9 27.2ZM192.9 20.5C190.2 20.5 188.9 22.2 188.9 24.6 188.9 27 190.2 28.8 192.9 28.8 195.7 28.8 197 27 197 24.6 197 22.2 195.7 20.5 192.9 20.5ZM252.7 28.6H254.7V26.5H252.7V28.6ZM187.1 17.5L184.8 26 182.6 17.5H180.3L180.8 19.3 178.8 26.3 176.7 17.5H174.5L177.6 28.6H179.9L181.8 22.6 183.5 28.6H185.9L189.1 17.5H187.1Z" />
		<path d="M1 18.4C1 17.7 1.4 17.4 2.1 17.4 2.9 17.4 3.3 17.7 3.3 18.4 3.3 18.7 3.2 19 3 19.1 2.8 19.3 2.5 19.4 2.1 19.4 1.4 19.4 1 19.1 1 18.4ZM3.2 28H1.1V20.4H3.2V28ZM12.4 28H10.3V23.5C10.3 23 10.2 22.6 10 22.3 9.9 22 9.5 21.9 9.1 21.9 8.5 21.9 8.1 22.1 7.8 22.5 7.6 22.9 7.5 23.5 7.5 24.4V28H5.4V20.4H7L7.2 21.3H7.4C7.6 21 7.9 20.7 8.3 20.5 8.7 20.3 9.2 20.2 9.7 20.2 10.6 20.2 11.3 20.5 11.7 20.9 12.2 21.4 12.4 22.1 12.4 23V28ZM22.4 28.1C21.5 28.1 20.8 27.8 20.3 27.2H20.2C20.3 27.8 20.3 28.2 20.3 28.3V31.4H18.2V20.4H19.9L20.2 21.3H20.3C20.8 20.6 21.5 20.2 22.5 20.2 23.4 20.2 24.1 20.6 24.6 21.3 25.1 22 25.3 22.9 25.3 24.2 25.3 25 25.2 25.7 25 26.3 24.7 26.9 24.4 27.4 24 27.7 23.5 28 23 28.1 22.4 28.1ZM21.8 21.9C21.3 21.9 20.9 22 20.7 22.4 20.4 22.7 20.3 23.2 20.3 23.9V24.2C20.3 25 20.4 25.6 20.7 25.9 20.9 26.3 21.3 26.4 21.8 26.4 22.8 26.4 23.2 25.7 23.2 24.1 23.2 23.4 23.1 22.8 22.9 22.4 22.6 22.1 22.3 21.9 21.8 21.9ZM31.9 28L31.5 27H31.5C31.1 27.4 30.8 27.7 30.4 27.9 30 28.1 29.5 28.1 28.9 28.1 28.2 28.1 27.6 27.9 27.2 27.5 26.8 27.1 26.6 26.5 26.6 25.7 26.6 24.9 26.8 24.3 27.4 23.9 28 23.5 28.8 23.3 30 23.3L31.3 23.2V22.9C31.3 22.1 30.9 21.7 30.1 21.7 29.5 21.7 28.8 21.9 28 22.3L27.3 20.9C28.2 20.4 29.1 20.2 30.2 20.2 31.2 20.2 32 20.4 32.6 20.9 33.1 21.3 33.4 22 33.4 22.9V28H31.9ZM31.3 24.5L30.5 24.5C29.9 24.5 29.4 24.6 29.1 24.8 28.9 25 28.7 25.3 28.7 25.7 28.7 26.3 29 26.6 29.7 26.6 30.2 26.6 30.6 26.5 30.9 26.2 31.2 25.9 31.3 25.5 31.3 25.1V24.5ZM39.8 20.2C40.1 20.2 40.3 20.2 40.5 20.3L40.3 22.2C40.2 22.2 40 22.2 39.7 22.2 39.1 22.2 38.5 22.3 38.2 22.7 37.8 23 37.6 23.5 37.6 24.1V28H35.5V20.4H37.1L37.4 21.6H37.5C37.8 21.2 38.1 20.9 38.5 20.6 38.9 20.3 39.3 20.2 39.8 20.2ZM45.1 26.5C45.5 26.5 45.9 26.4 46.4 26.2V27.8C45.9 28 45.3 28.1 44.5 28.1 43.7 28.1 43.1 27.9 42.7 27.5 42.3 27.1 42.1 26.5 42.1 25.6V21.9H41.1V21L42.3 20.3 42.9 18.7H44.2V20.4H46.3V21.9H44.2V25.6C44.2 25.9 44.3 26.1 44.4 26.3 44.6 26.4 44.8 26.5 45.1 26.5ZM55 28H52.9V23.5C52.9 23 52.8 22.6 52.7 22.3 52.5 22 52.1 21.9 51.7 21.9 51.1 21.9 50.7 22.1 50.4 22.5 50.2 22.9 50.1 23.5 50.1 24.4V28H48V20.4H49.6L49.8 21.3H50C50.2 21 50.5 20.7 50.9 20.5 51.3 20.3 51.8 20.2 52.3 20.2 53.2 20.2 53.9 20.5 54.3 20.9 54.8 21.4 55 22.1 55 23V28ZM60.3 21.7C59.9 21.7 59.6 21.8 59.3 22.1 59.1 22.4 58.9 22.8 58.9 23.3H61.8C61.8 22.8 61.7 22.4 61.4 22.1 61.1 21.8 60.8 21.7 60.3 21.7ZM60.6 28.1C59.4 28.1 58.4 27.8 57.8 27.1 57.1 26.4 56.7 25.5 56.7 24.2 56.7 23 57 22 57.7 21.3 58.3 20.6 59.2 20.2 60.3 20.2 61.4 20.2 62.2 20.5 62.8 21.1 63.5 21.8 63.8 22.6 63.8 23.7V24.7H58.8C58.8 25.3 59 25.8 59.3 26.1 59.7 26.4 60.1 26.6 60.7 26.6 61.2 26.6 61.6 26.5 62 26.4 62.4 26.3 62.9 26.2 63.3 26V27.6C63 27.8 62.6 27.9 62.2 28 61.7 28.1 61.2 28.1 60.6 28.1ZM69.7 20.2C70 20.2 70.2 20.2 70.4 20.3L70.3 22.2C70.1 22.2 69.9 22.2 69.6 22.2 69 22.2 68.5 22.3 68.1 22.7 67.7 23 67.5 23.5 67.5 24.1V28H65.4V20.4H67L67.3 21.6H67.4C67.7 21.2 68 20.9 68.4 20.6 68.8 20.3 69.2 20.2 69.7 20.2ZM77.1 25.7C77.1 26.5 76.9 27.1 76.3 27.5 75.8 27.9 75 28.1 73.9 28.1 73.3 28.1 72.8 28.1 72.5 28 72.1 27.9 71.7 27.8 71.4 27.7V26C71.7 26.2 72.2 26.3 72.7 26.4 73.1 26.6 73.6 26.6 73.9 26.6 74.7 26.6 75.1 26.4 75.1 26 75.1 25.8 75 25.7 74.9 25.6 74.8 25.5 74.7 25.3 74.4 25.2 74.2 25.1 73.8 24.9 73.4 24.8 72.8 24.5 72.4 24.3 72.1 24.1 71.9 23.9 71.7 23.6 71.5 23.4 71.4 23.1 71.3 22.7 71.3 22.3 71.3 21.7 71.6 21.1 72.1 20.8 72.7 20.4 73.4 20.2 74.4 20.2 75.3 20.2 76.2 20.4 77.1 20.8L76.4 22.3C76 22.2 75.7 22 75.4 21.9 75 21.8 74.7 21.8 74.3 21.8 73.7 21.8 73.4 21.9 73.4 22.3 73.4 22.4 73.5 22.6 73.7 22.7 73.9 22.9 74.3 23.1 75 23.4 75.6 23.6 76 23.8 76.3 24 76.6 24.2 76.8 24.5 76.9 24.8 77.1 25 77.1 25.4 77.1 25.7ZM85.8 28H83.7V23.5C83.7 22.4 83.3 21.9 82.5 21.9 81.9 21.9 81.5 22.1 81.2 22.5 81 22.9 80.8 23.5 80.8 24.4V28H78.8V17.4H80.8V19.5C80.8 19.7 80.8 20.1 80.8 20.7L80.8 21.3H80.9C81.3 20.6 82.1 20.2 83.1 20.2 84 20.2 84.7 20.5 85.1 20.9 85.6 21.4 85.8 22.1 85.8 23V28ZM87.9 18.4C87.9 17.7 88.3 17.4 89 17.4 89.8 17.4 90.1 17.7 90.1 18.4 90.1 18.7 90 19 89.9 19.1 89.7 19.3 89.4 19.4 89 19.4 88.3 19.4 87.9 19.1 87.9 18.4ZM90 28H88V20.4H90V28ZM96.4 28.1C95.5 28.1 94.8 27.8 94.3 27.2H94.2C94.3 27.8 94.3 28.2 94.3 28.3V31.4H92.2V20.4H93.9L94.2 21.3H94.3C94.8 20.6 95.5 20.2 96.5 20.2 97.4 20.2 98.1 20.6 98.6 21.3 99.1 22 99.4 22.9 99.4 24.2 99.4 25 99.3 25.7 99 26.3 98.8 26.9 98.4 27.4 98 27.7 97.6 28 97 28.1 96.4 28.1ZM95.8 21.9C95.3 21.9 94.9 22 94.7 22.4 94.5 22.7 94.3 23.2 94.3 23.9V24.2C94.3 25 94.4 25.6 94.7 25.9 94.9 26.3 95.3 26.4 95.9 26.4 96.8 26.4 97.3 25.7 97.3 24.1 97.3 23.4 97.1 22.8 96.9 22.4 96.7 22.1 96.3 21.9 95.8 21.9ZM111 28L110.4 25.3 109.7 22H109.6L108.2 28H106L103.8 20.4H105.9L106.7 23.7C106.8 24.1 107 25 107.2 26.3H107.2C107.2 25.9 107.3 25.4 107.5 24.6L107.6 24 108.5 20.4H110.8L111.7 24C111.8 24.3 111.8 24.6 111.9 25.1 112 25.6 112 26 112 26.3H112.1C112.1 25.8 112.2 25.4 112.3 24.9 112.4 24.3 112.5 24 112.5 23.7L113.4 20.4H115.5L113.3 28H111ZM116.6 18.4C116.6 17.7 117 17.4 117.8 17.4 118.5 17.4 118.9 17.7 118.9 18.4 118.9 18.7 118.8 19 118.6 19.1 118.4 19.3 118.2 19.4 117.8 19.4 117 19.4 116.6 19.1 116.6 18.4ZM118.8 28H116.7V20.4H118.8V28ZM124.2 26.5C124.6 26.5 125 26.4 125.5 26.2V27.8C125 28 124.4 28.1 123.6 28.1 122.8 28.1 122.2 27.9 121.8 27.5 121.4 27.1 121.2 26.5 121.2 25.6V21.9H120.2V21L121.4 20.3 122 18.7H123.3V20.4H125.5V21.9H123.3V25.6C123.3 25.9 123.4 26.1 123.6 26.3 123.7 26.4 124 26.5 124.2 26.5ZM134.1 28H132.1V23.5C132.1 22.4 131.7 21.9 130.8 21.9 130.3 21.9 129.8 22.1 129.6 22.5 129.3 22.9 129.2 23.5 129.2 24.4V28H127.1V17.4H129.2V19.5C129.2 19.7 129.2 20.1 129.1 20.7L129.1 21.3H129.2C129.7 20.6 130.4 20.2 131.4 20.2 132.3 20.2 133 20.5 133.5 20.9 133.9 21.4 134.1 22.1 134.1 23V28Z" />
	</svg>
);

const WpcomColophon = ( { className } ) => (
	<div className={ classNames( 'wpcom-colophon', className ) }>{ icon }</div>
);

export default WpcomColophon;
