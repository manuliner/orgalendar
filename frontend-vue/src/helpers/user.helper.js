import userService from "../services/user.service";

class UserHelper {
  isEmptyObject(object) {
    return (
      object === null ||
      (object && // null and undefined check
        Object.keys(object).length === 0 &&
        Object.getPrototypeOf(object) === Object.prototype)
    );
  }
  getLocalStorage(name) {
    let parsedStorage = JSON.parse(localStorage.getItem(name));
    if (this.isEmptyObject(parsedStorage)) {
      return {};
    } else {
      return parsedStorage;
    }
  }
  getOrgaStorage() {
    let user = this.getLocalStorage("orgalendarUser");
    let calendar = this.getLocalStorage("orgalendarCalendar");

    return { user, calendar };
  }

  setLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
  handleMounting(instance) {
    //1.  check if calendar is matching
    //     if not redirect user chooser
    //2. check if user is matching
    //     if not redirect to user chooser
    //3. if yes -> save in localstorage
    let currentCalendar = instance.$route.params.slug;

    const { storedUser, storedCalendar } = this.getOrgaStorage();

    if (currentCalendar !== storedCalendar) {
      instance.$router.push({
        name: "ChooseUser",
        params: { slug: currentCalendar },
      });
      return;
    }

    userService.getCalendarUsers(currentCalendar).then((resp) => {
      resp.data.forEach((element) => {
        console.log(element, storedUser);
      });

      if (currentCalendar !== storedCalendar) {
        instance.$router.push({
          name: "ChooseUser",
          params: { slug: currentCalendar },
        });
        return;
      }
    });
  }
}

export default new UserHelper();
