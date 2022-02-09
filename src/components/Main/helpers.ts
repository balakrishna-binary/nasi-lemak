export async function generateVCard(user, logo?: string) {
  try {
    const {
      FNProperty,
      TextType,
      VCARD,
      PhotoProperty,
      URIType,
      OrgProperty,
      TypeParameter,
      SpecialValueType,
      AdrProperty,
      TelProperty,
      ValueParameter,
      TextListType,
      PrefParameter,
      IntegerType,
      EmailProperty,
      NProperty
    } = await import('vcard4');

    const full_name = new FNProperty([], new TextType([user.first_name, user.last_name].filter(n => n).join(' ')));

    const nArr = new Array(5);
    nArr[0] = new TextType(user.last_name);
    nArr[1] = new TextType(user.first_name);
    const additional_name = new NProperty([], new SpecialValueType(nArr, "nproperty"));

    const organization = new OrgProperty(
      [new TypeParameter(new TextType("work"), "orgproperty")],
      new SpecialValueType([new TextType(user?.company)], "orgproperty")
    );

    const aArr = new Array(7);
    aArr[1] = new TextType(user?.address?.street || '');
    aArr[3] = new TextType(user?.address?.state || '');
    aArr[5] = new TextType(user?.address?.zip || '');
    aArr[6] = new TextType(user?.address?.country || '');
    const address = new AdrProperty(
      [new TypeParameter(new TextType("work"), "adrproperty")],
      new SpecialValueType(aArr, "adrproperty")
    );

    const phone = new TelProperty(
      [
        new ValueParameter(new URIType("tel:" + user?.phone || '')),
        new TypeParameter(
          new TextListType([new TextType("HOME"), new TextType("voice")]),
          "telproperty"
        ),
        new PrefParameter(new IntegerType(1)),
      ],
      new URIType("tel:" + user?.phone || '')
    );

    const work_phone = new TelProperty(
      [
        new ValueParameter(new URIType("tel:" + user?.work_phone || '')),
        new TypeParameter(
          new TextListType([
            new TextType("WORK"),
            new TextType("CELL"),
            new TextType("VOICE"),
            new TextType("VIDEO"),
          ]),
          "telproperty"
        ),
      ],
      new URIType("tel:" + user?.work_phone || '')
    );

    const email = new EmailProperty(
      [new TypeParameter(new TextType("WORK"), "emailproperty")],
      new TextType(user?.email || '')
    );

    // not working //
    const photo = new PhotoProperty(
      [],
      new URIType('http://www.example.com/pub/photos/jqpublic.gif')
    );
    
    const vcard = new VCARD([
      full_name,
      additional_name,
      organization,
      address,
      phone,
      work_phone,
      email,
    ]);

    return vcard.repr();
  } catch(err) {
    throw new Error(err)
  }
}

export async function generateQRCode(data) {
  try{
    const QRCodeStyling = (await import('qr-code-styling')).default;
    const {
      vcard,
      color = '#4267b2',
      backgroundColor = "#ffffff",
      logo
    } = data;

    const options = {
      width: 300,
      height: 300,
      data: vcard,
      dotsOptions: {
        color: color,
        type: "rounded",
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 8
      },
      cornerSquareOptions: {
        type: "extra-rounded", // dot, square, extra-rounded
        color: '#eeeeee'
      }
    };

    if(logo) {
      options['image'] = logo;
    }

    return new QRCodeStyling(options);

  } catch (err) {
    throw new Error(err)
  }
}