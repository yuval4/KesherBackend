const welcomeMail = (email, name, password) => {
    return {
        to: email,
        from: process.env.MAIL,
        subject: "ברוכים הבאים לאפליקציית קשר",
        html: `<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
                <!--[if !mso]><!-->
                <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
                <!--<![endif]-->
                <!--[if (gte mso 9)|(IE)]>
                    <xml>
                        <o:OfficeDocumentSettings>
                            <o:AllowPNG />
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                <![endif]-->
                <!--[if (gte mso 9)|(IE)]>
                    <style type="text/css">
                        body {
                            width: 600px;
                            margin: 0 auto;
                        }
                        table {
                            border-collapse: collapse;
                        }
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                    </style>
                <![endif]-->
                <style type="text/css">
                    body,
                    p,
                    div {
                        font-family: inherit;
                        font-size: 14px;
                    }
                    body {
                        color: #000000;
                        direction: rtl;
                    }
                    body a {
                        color: #000000;
                        text-decoration: none;
                    }
                    p {
                        margin: 0;
                        padding: 0;
                    }
                    table.wrapper {
                        width: 100% !important;
                        table-layout: fixed;
                        -webkit-font-smoothing: antialiased;
                        -webkit-text-size-adjust: 100%;
                        -moz-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
                    img.max-width {
                        max-width: 100% !important;
                    }
                    .column.of-2 {
                        width: 50%;
                    }
                    .column.of-3 {
                        width: 33.333%;
                    }
                    .column.of-4 {
                        width: 25%;
                    }
                    ul ul ul ul {
                        list-style-type: disc !important;
                    }
                    ol ol {
                        list-style-type: lower-roman !important;
                    }
                    ol ol ol {
                        list-style-type: lower-latin !important;
                    }
                    ol ol ol ol {
                        list-style-type: decimal !important;
                    }
                    @media screen and (max-width: 480px) {
                        .preheader .rightColumnContent,
                        .footer .rightColumnContent {
                            text-align: left !important;
                        }
                        .preheader .rightColumnContent div,
                        .preheader .rightColumnContent span,
                        .footer .rightColumnContent div,
                        .footer .rightColumnContent span {
                            text-align: left !important;
                        }
                        .preheader .rightColumnContent,
                        .preheader .leftColumnContent {
                            font-size: 80% !important;
                            padding: 5px 0;
                        }
                        table.wrapper-mobile {
                            width: 100% !important;
                            table-layout: fixed;
                        }
                        img.max-width {
                            height: auto !important;
                            max-width: 100% !important;
                        }
                        .columns {
                            width: 100% !important;
                        }
                        .column {
                            display: block !important;
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            margin-left: 0 !important;
                            margin-right: 0 !important;
                        }
                        .social-icon-column {
                            display: inline-block !important;
                        }
                    }
                </style>
                <!--user entered Head Start-->
                <link href="https://fonts.googleapis.com/css?family=Viga&amp;display=swap" rel="stylesheet" />
                <style>
                    body {
                        font-family: "Viga", sans-serif;
                    }
                </style>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Assistant&display=swap" rel="stylesheet" />
                <!--End Head user entered-->
            </head>
            <body>
                <center class="wrapper" data-link-color="#000000" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
                    <div class="webkit">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                            <tbody>
                                <tr>
                                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                            <tbody>
                                                <tr>
                                                    <td width="100%">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <!--[if mso]>
        <center>
        <table><tr><td width="600">
        <![endif]-->
                                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px;" align="center">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#FFFFFF" width="100%" align="left">
                                                                                        <table
                                                                                            class="module preheader preheader-hide"
                                                                                            role="module"
                                                                                            data-type="preheader"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            width="100%"
                                                                                            style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;"
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td role="module-content">
                                                                                                        <p></p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            align="center"
                                                                                            width="100%"
                                                                                            role="module"
                                                                                            data-type="columns"
                                                                                            style="padding: 0px 0px 0px 0px;"
                                                                                            bgcolor="#f8f4ff"
                                                                                            data-distribution="1"
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr role="module-content">
                                                                                                    <td height="100%" valign="top">
                                                                                                        <table
                                                                                                            width="580"
                                                                                                            style="width: 580px; border-spacing: 0; border-collapse: collapse; margin: 0px 10px 0px 10px;"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            align="left"
                                                                                                            border="0"
                                                                                                            bgcolor=""
                                                                                                            class="column column-0"
                                                                                                        >
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="padding: 0px; margin: 0px; border-spacing: 0;">
                                                                                                                        <table
                                                                                                                            class="module"
                                                                                                                            role="module"
                                                                                                                            data-type="spacer"
                                                                                                                            border="0"
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="table-layout: fixed;"
                                                                                                                            data-muid="10cc50ce-3fd3-4f37-899b-a52a7ad0ccce"
                                                                                                                        >
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="padding: 0px 0px 40px 0px;" role="module-content" bgcolor=""></td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <table
                                                                                                                            class="wrapper"
                                                                                                                            role="module"
                                                                                                                            data-type="image"
                                                                                                                            border="0"
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="table-layout: fixed;"
                                                                                                                            data-muid="f8665f9c-039e-4b86-a34d-9f6d5d439327"
                                                                                                                        >
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="font-size: 6px; line-height: 10px; padding: 0px 0px 0px 0px;" valign="top" align="center">
                                                                                                                                        <img
                                                                                                                                            class="max-width"
                                                                                                                                            border="0"
                                                                                                                                            style="
                                                                                                                                                display: block;
                                                                                                                                                color: #000000;
                                                                                                                                                text-decoration: none;
                                                                                                                                                font-family: Helvetica, arial, sans-serif;
                                                                                                                                                font-size: 16px;
                                                                                                                                            "
                                                                                                                                            width="334"
                                                                                                                                            alt=""
                                                                                                                                            data-proportionally-constrained="true"
                                                                                                                                            data-responsive="false"
                                                                                                                                            src="http://cdn.mcauto-images-production.sendgrid.net/08f09f157a0ae368/8294a83e-8a31-4e64-ad97-f70fb50fa5bd/2480x1338.png"
                                                                                                                                            height="180"
                                                                                                                                        />
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <table
                                                                                                                            class="module"
                                                                                                                            role="module"
                                                                                                                            data-type="spacer"
                                                                                                                            border="0"
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="table-layout: fixed;"
                                                                                                                            data-muid="10cc50ce-3fd3-4f37-899b-a52a7ad0ccce.1"
                                                                                                                        >
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="padding: 0px 0px 40px 0px;" role="module-content" bgcolor=""></td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table
                                                                                            class="module"
                                                                                            role="module"
                                                                                            data-type="text"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            width="100%"
                                                                                            style="table-layout: fixed;"
                                                                                            data-muid="bff8ffa1-41a9-4aab-a2ea-52ac3767c6f4"
                                                                                            data-mc-module-version="2019-10-22"
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="padding: 18px 30px 18px 30px; line-height: 40px; text-align: inherit; background-color: #f8f4ff;"
                                                                                                        height="100%"
                                                                                                        valign="top"
                                                                                                        bgcolor="#f8f4ff"
                                                                                                        role="module-content"
                                                                                                    >
                                                                                                        <div>
                                                                                                            <div style="font-family: inherit; text-align: center;">
                                                                                                                <span style="font-size: 24px; color: #804ed9; font-family: 'Assistant', sans-serif; font-weight: 900;">
                                                                                                                    שלום ${name}, וברוכים הבאים לאפליקציית Kesher!
                                                                                                                </span>
                                                                                                            </div>
                                                                                                            <div></div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table
                                                                                            class="module"
                                                                                            role="module"
                                                                                            data-type="text"
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            width="100%"
                                                                                            style="table-layout: fixed;"
                                                                                            data-muid="2f94ef24-a0d9-4e6f-be94-d2d1257946b0"
                                                                                            data-mc-module-version="2019-10-22"
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style="padding: 18px 50px 18px 50px; line-height: 22px; text-align: inherit; background-color: #f8f4ff; font-family: 'Assistant', sans-serif;"
                                                                                                        height="100%"
                                                                                                        valign="top"
                                                                                                        bgcolor="#F8F4FF"
                                                                                                        role="module-content"
                                                                                                    >
                                                                                                        <div>
                                                                                                            <div style="font-family: inherit; text-align: center; direction: rtl; font-weight: 600;">
                                                                                                                <span style="font-size: 20px;">פרטי התחברות:</span>
                                                                                                            </div>
                                                                                                            <div style="font-family: inherit; text-align: center;">
                                                                                                                <span style="font-size: 20px; font-family: 'Assistant', sans-serif;">המייל אליו הגיעה הודעה זו</span>
                                                                                                            </div>
                                                                                                            <div style="font-family: inherit; text-align: center;">
                                                                                                                <span style="font-size: 20px; font-family: 'Assistant', sans-serif;">סיסמה: ${password}</span>
                                                                                                            </div>
                                                                                                            <div></div>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table
                                                                                            border="0"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            align="center"
                                                                                            width="100%"
                                                                                            role="module"
                                                                                            data-type="columns"
                                                                                            style="padding: 30px 0px 0px 0px;"
                                                                                            bgcolor="#F8F4FF"
                                                                                            data-distribution="1"
                                                                                        >
                                                                                            <tbody>
                                                                                                <tr role="module-content">
                                                                                                    <td height="100%" valign="top">
                                                                                                        <table
                                                                                                            width="600"
                                                                                                            style="width: 600px; border-spacing: 0; border-collapse: collapse; margin: 0px 0px 0px 0px;"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            align="left"
                                                                                                            border="0"
                                                                                                            bgcolor=""
                                                                                                            class="column column-0"
                                                                                                        >
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td style="padding: 0px; margin: 0px; border-spacing: 0;">
                                                                                                                        <table
                                                                                                                            class="wrapper"
                                                                                                                            role="module"
                                                                                                                            data-type="image"
                                                                                                                            border="0"
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            width="100%"
                                                                                                                            style="table-layout: fixed;"
                                                                                                                            data-muid="ce6dd3be-5ed4-42d2-b304-55a58022cdf0"
                                                                                                                        >
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td style="font-size: 6px; line-height: 10px; padding: 0px 0px 0px 0px;" valign="top" align="center">
                                                                                                                                        <img
                                                                                                                                            class="max-width"
                                                                                                                                            border="0"
                                                                                                                                            style="
                                                                                                                                                display: block;
                                                                                                                                                color: #000000;
                                                                                                                                                text-decoration: none;
                                                                                                                                                font-family: Helvetica, arial, sans-serif;
                                                                                                                                                font-size: 16px;
                                                                                                                                                max-width: 75% !important;
                                                                                                                                                width: 75%;
                                                                                                                                                height: auto !important;
                                                                                                                                            "
                                                                                                                                            width="450"
                                                                                                                                            alt=""
                                                                                                                                            data-proportionally-constrained="true"
                                                                                                                                            data-responsive="true"
                                                                                                                                            src="http://cdn.mcauto-images-production.sendgrid.net/08f09f157a0ae368/3a4d5005-84b4-44dc-bcce-8eea94968574/2000x2000.png"
                                                                                                                                        />
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if mso]>
                                    </td>
                                  </tr>
                                </table>
                              </center>
                              <![endif]-->
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </center>
            </body>
        </html>
        `,
    };
};

module.exports = { welcomeMail };
