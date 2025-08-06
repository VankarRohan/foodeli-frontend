import React from 'react'
import "./Errorpage.css"

const ErrorPage = () => {
    return (
        <div className="error-page">


            <main>
                <div id="wrap">
                    <div class="hand hand-left">
                        <span class='hand-part part-top'></span>
                        <span class='hand-part part-middle'></span>
                        <span class='hand-part part-bottom'></span>
                    </div>
                    <div class="hand hand-right">
                        <span class='hand-part part-top'></span>
                        <span class='hand-part part-middle'></span>
                        <span class='hand-part part-bottom'></span>
                    </div>
                    <div class='line line-1'>
                        <div class="ball">4</div>
                    </div>
                    <div class='line line-2'>
                        <div class="ball">0</div>
                    </div>
                    <div class='line line-3'>
                        <div class="ball">1</div>
                    </div>
                    <div id="server">
                        <div class="eye eye-left"><span></span></div>
                        <div class="eye eye-right"><span></span></div>
                        <div class="block">
                            <div class="light"></div>
                        </div>
                        <div class="block">
                            <div class="light"></div>
                        </div>
                        <div class="block">
                            <div class="light"></div>
                        </div>
                        <div class="block">
                            <div class="light"></div>
                        </div>
                        <div class="block">
                            <div class="light"></div>
                        </div>
                        <div id="bottom-block">
                            <div class="bottom-line"></div>
                            <div id="bottom-light"></div>
                        </div>
                    </div>
                </div>

                <div id="code-error">
                    <h1>Oops....Something went wrong !!!</h1>
                    <h5>The page you are trying to access doesn't exist...</h5>
                </div>

            </main>
        </div>

    )
}

export default ErrorPage
