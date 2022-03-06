export const formatShortNumber = (value: number): string => {
    if (value >= 1000) {
        var units = ['k', 'M', 'B', 'T'];

        var order = Math.floor(Math.log(value) / Math.log(1000));

        var unitname = units[order - 1];
        var num = Math.floor(value / 1000 ** order);

        // output number remainder + unitname
        return num + unitname;
    }

    // return formatted original number
    return value.toLocaleString();
};
