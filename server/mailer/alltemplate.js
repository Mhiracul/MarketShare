const emailTemplate2 = (text) => {
  return `
        <style>
            * {
                font-family: sans-serif;
            }
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin: auto;
        background: #fdde4f0d;
        border-radius: .5rem;
    }
    
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    p{
        width: fit-content;
        text-align: center;
    }
    .signed {
        align-self: flex-end;
        margin-right: 23%;
        margin-top: 2rem;
    }
    .download {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: #fedd4875;
        border-radius: .5rem;
        margin-top: 4rem;
    }
    .download a img {
        height: 3rem;
    }
        </style>
    
        <section class='container'>
             <img src='' alt='' />
    
            <p style='width: 95%; font-size: medium;'>
                ${text}
            </p>
        
                <section class="download">
                    <h2>Share MarketShare with your friends</h2>
    
                    <p style="color: #2b2b2bc7;">You can download the app from Google playstore and <br />we will take care of your challenges.</p>
    
                  <a href="#linkTODownload" rel="noreferrer">
                    <img src="https://app.boostwallet.online/boost_test_server/Get+it+on+Google+Play.png" alt="Download Marketshare App" /> 
                  </a>  
    
                </section>
    
                <section style="margin-top: 4rem; display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: small;">
                   <p> <b>Fullstem</b> </p>
                    <p>
    
                    ©Marketshare Inc 2022
                    </p>

                   
                   
                </section>
        
        </section>
    
        
   `;
};

module.exports = { emailTemplate2 };
