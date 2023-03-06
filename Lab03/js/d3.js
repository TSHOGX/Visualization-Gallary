async function main() {
    const dataset = await d3.csv('./data/data.csv')

    const imgIDs = [];
    for (var i=1; i<61; i++) {
        imgIDs.push(i);
    }

    const expertIDs = [];
    for (var i=1; i<12; i++) {
        expertIDs.push(i);
    }

    // for(var i=0; i<imgIDs.length; i++) {
    //     for (var j=1; j<expertIDs.length; j++) {
    //         drawPathOnImg(imgIDs[i], expertIDs[j])
    //     }
    // }

    for(var i=0; i<imgIDs.length; i++) {
        // drawPathOnImgAllExperts(imgIDs[i])
        drawPointsOnImgAllExperts(imgIDs[i])
        // drawBarFixationNumAndExp(imgIDs[i])
        // drawBarNavigatorNumAndExp(imgIDs[i])
        // drawScatterNavigatorNumAndExp(imgIDs[i])
        // drawBarAcc(imgIDs[i])
        // drawBubbleAcc(imgIDs[i])
    }

    // const pathOnImg = imgID => {}
    // imgIDs.forEach(pathOnImg)

}

main()
