import React from 'react';
import '../css/Footer.css'
import fhirlylogo from '../../testData/fhirlylogo.png'
const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='img-container'>
                <img alt='Fhirly logo' src={fhirlylogo} className='animated-image' />
            </div>
            <div>
                <p className='footer-text'>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
            </div>
        </div>
    );
};

export default Footer;