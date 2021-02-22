import { Preferences } from '../index';
jest.mock('https');
const nock = require('nock');

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
'MIIEpQIBAAKCAQEAwCtQ1cAYp7tNiA0SojsVgiO9DwsLhs5ZOEkKa72RFPBUS7fD\n' +
'BA2cZqJha+7ZtDnQRThIaGHnXbZSABIffAB67+jBB1sg/ublYf4mvT8qXUj2MUs6\n' +
'ft7jBarIeXAo8xFC7Bdbj0GRGUsTD74ZT9R/XF3t1qYomqu9PCeRK3BwEykAVogF\n' +
'Q5z2D3KiMcKPw+YmdPpzoj643fK/UrWzAVwUPTWDeLvj3JIVrYKkkbiDO2oqZzVF\n' +
'uZ0qBbe+9aWQW4QqAavSAIxWszr9Wn0LontOwZ0oUBl7TiPvCb1mqMzsq4R8ghWV\n' +
'G/CxH4n/p2ktGwxvs+e6JGHCpCohq6SACU7R9wIDAQABAoIBAQCGewmjvD3Ey7/z\n' +
'MOrUWzKvEyGQMHONkERBrmO7iDrKg3EKV/wCjx/fd01kAg+aH0dP2ZZabgFCxH9Y\n' +
'C1a7KX7e+2xyIGTT3XOzAu/LSjP0ekXHs1SpSoNnCOAok8QkbfT+UU5Cz2iiYbZi\n' +
'Mu91vUivtA/oQflyXDMesLXXx2S3EqhEdBCKuS09FetDGdJdx6/x9BiFPNkBQBvJ\n' +
'RYoCGh+gjnQB0GstAaFeSj/61q7pdOWBqma/POj7Gjki/Xsctq1QYzkEgLbBrSya\n' +
'4nJW237YbTY42vHaENtVMSx3MYPnUSCyKttTlDLoPw5t3nJz40bpRKcQqsIOfP75\n' +
'mdNmXct5AoGBAO1Bzc7D4NDATjCQXCxzgqRrup8YD/pqhhmU3Ry9QfADDnOVYsDo\n' +
'zU9VCE001wiXyCoA8yae1yOJtc6WJNMH5ksaJV/l8paNKb9Bom4HtbdML43EODwl\n' +
'c0XlqFnOu7qYYMpnS7vQZFek7V7VRPYBcG48F35kT+1iC9v93dIrdee1AoGBAM9Z\n' +
'rCWMT/m2qB+G7MBdlAspYj7G8Fq2x6R0pNpYG1CxoxT0dEOrrLcHjIUScAj8jXjE\n' +
'yvmL3+3vdhQ5WmckVBhp62nT25qMF7dHTkaWadEQUX7ZU7Wn4pf4jsrFnYt9wJ+g\n' +
'iZft54JrVaPhUEg2S8YB1/fM/K3tX9syPtbnOUZ7AoGBAOuHu+xbgD876WNErHxk\n' +
'X3kiiS2PEa2jOmUC5060g1Tlc99CmbqwYcEzxP4ASsh5BXjNYJUicqkQ+K+RVhU5\n' +
'bmF4H0pIWL8kfCEl4z4f4UGKHFs8RCdRdlIZXztog+0FgHDugrx8cGChlhPi3Ibr\n' +
'ftWwShJrOv2JrAREzYTrKC1RAoGBAJCfnCmoX1PuKf+rbVCTNKJAYC0nNxgeqssz\n' +
'LJS6pXq4G+aOxtU4VcRnuIRMouYxuT9GC8jY3fyobDSY+Ew+k4Vfw3pR8bcvBY+p\n' +
'ZZhoazAN8LnIPdHTYoHbNUWLZmKX+JWeNLpKjpJx6Q7gJc3oSRu3x3ooeQmbKqPJ\n' +
'vPjJ2DInAoGAVoUHP6mBbpo7mKXr4cKSkWn5ix3EvghKM5Gf/VDKg79L/rtzqZ+C\n' +
'IvM1ILqlbA0g/ZL5NKTnNpFnovijpjrAUHN7VdrNeG0OGrD6PQIN99Ojn1/9JFUh\n' +
'b2TCbujQ82PN8J2CBl9FGvTf/gt0UTKAEQrXZdiqH7YQWmg+WYSxcK0=\n' +
'-----END RSA PRIVATE KEY-----';

it('1. get the preferences of a user', async () => {
  nock('https://preferences.practera.another')
    .get('/api')
    .reply(200, {
      code: 200,
      message: "success",
      categories: [
        {
          name: 'Sample Notifications',
          order: 1,
          preferences: [
            {
              description: 'Sample notifications',
              key: 'sample-key',
              name: 'Notify me',
              options: [
                {
                  locked: false,
                  locked_name: '',
                  medium: 'email',
                  name: 'Email',
                  value: false
                },
                {
                  locked: false,
                  locked_name: '',
                  medium: 'sms',
                  name: 'SMS',
                  value: false
                }
              ],
              remarks: 'sample remarks'
            }
          ]
        }
      ]
    })
  
  const preferences = new Preferences(privateKey, 'NOTIFICATION', 'https://preferences.practera.another/api');

  const response = await preferences.get('lala');
  expect(response).toMatchSnapshot();
});

it('2. save the preferences of a user', async () => {
  nock('https://preferences.practera.com')
    .post('/api')
    .reply(200, {
      code: 200,
      message: "success",
    });
  
  const preferences = new Preferences(privateKey, 'NOTIFICATION');
  const response = await preferences.save('lala', {value: 'blah'});
  expect(response).toMatchSnapshot();
});